import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookingEntity } from '../entities/BookingEntity';
import { UsersService } from './users.service';
import { ReviewsService } from './reviews.service';
import { PromoService } from './promo.service';
import { HotelsService } from './hotels.service';
import { PromoApiModel } from 'src/models/PromoApiModel';
import { EventBusService } from './eventBus.service';

const HOTEL_BASE_PRICE = 100.0;
const HOTEL_VIP_USER_DISCOUNT_PERCENT = 0.2;

@Injectable()
export class BookingService {
    constructor(
        @Inject('BOOKING_REPOSITORY')
        private readonly bookingRepository: Repository<BookingEntity>,
        private readonly usersService: UsersService,
        private readonly hotelsService: HotelsService,
        private readonly reviewsService: ReviewsService,
        private readonly promoService: PromoService,
        private readonly eventBusService: EventBusService,
    ) {}

    async findAll(): Promise<BookingEntity[]> {
        return this.bookingRepository.find();
    }

    async findByUserId(userId: string): Promise<BookingEntity[]> {
        return this.bookingRepository.findBy({ userId });
    }

    async createBooking(
        userId: string,
        hotelId: string,
        promoCode?: string,
    ): Promise<BookingEntity> {
        if (!userId) {
            throw new Error('User is required');
        }

        if (!hotelId) {
            throw new Error('Hotel is required');
        }

        await this.validateUser(userId);
        await this.validateHotel(hotelId);

        const [basePrice, discount] = await Promise.all([
            this.evaluateBasePrice(userId, userId),
            this.evaluateDiscountPercent(promoCode, userId),
        ]);

        const finalPrice = basePrice * (1 - discount * 0.01);
        console.log(
            `Final price calculated: base=${basePrice}, discount=${discount}, final=${finalPrice}`,
        );

        const entity = new BookingEntity();
        entity.userId = userId;
        entity.hotelId = hotelId;
        entity.promoCode = promoCode;
        entity.price = finalPrice;
        entity.discountPercent = discount;

        await this.bookingRepository.insert(entity);

        await this.eventBusService.bookingCreated({
            id: entity.id,
            userId: entity.userId,
            hotelId: entity.hotelId,
            promoCode: entity.promoCode,
            discountPercent: entity.discountPercent,
            price: entity.price,
            createdAt: entity.createdAt.toISOString(),
        });

        return entity;
    }

    private async validateUser(userId: string): Promise<void> {
        const [isUserActive, isUserBlacklisted] = await Promise.all([
            this.usersService.isUserActive(userId),
            this.usersService.isUserBlacklisted(userId),
        ]);

        if (!isUserActive) {
            console.warn(`User ${userId} is inactive`);
            throw new Error(`User is inactive`);
        }

        if (isUserBlacklisted) {
            console.warn(`User ${userId} is blacklisted`);
            throw new Error(`User is blacklisted`);
        }
    }

    private async validateHotel(hotelId: string): Promise<void> {
        const [isHotelOperational, isTrustedHotel, isHotelFullyBooked] = await Promise.all([
            this.hotelsService.isHotelOperational(hotelId),
            this.reviewsService.isTrustedHotel(hotelId),
            this.hotelsService.isHotelFullyBooked(hotelId),
        ]);

        if (!isHotelOperational) {
            console.warn(`Hotel ${hotelId} is not operational`);
            throw new Error(`Hotel is not operational`);
        }

        if (!isTrustedHotel) {
            console.warn(`Hotel ${hotelId} is not trusted`);
            throw new Error(`Hotel is not trusted`);
        }

        if (isHotelFullyBooked) {
            console.warn(`Hotel ${hotelId} is fully booked`);
            throw new Error(`Hotel is fully booked`);
        }
    }

    private async evaluateBasePrice(hotelId: string, userId: string): Promise<number> {
        const userStatus = await this.usersService.getUserStatus(userId);

        if (!userStatus || typeof userStatus !== 'string') {
            console.debug(
                `User ${userId} has unknown status ([${typeof userStatus}] ${userStatus}), default base price ${HOTEL_BASE_PRICE}`,
            );
            return HOTEL_BASE_PRICE;
        }

        const isVipUser = userStatus.toLowerCase() === 'vip';

        if (isVipUser) {
            const price = HOTEL_BASE_PRICE * (1 - HOTEL_VIP_USER_DISCOUNT_PERCENT);

            console.debug(`User ${userId} has status '${userStatus}', base price is ${price}`);
            return price;
        }

        console.debug(
            `User ${userId} has status '${userStatus}', base price is ${HOTEL_BASE_PRICE}`,
        );
        return HOTEL_BASE_PRICE;
    }

    private async evaluateDiscountPercent(
        promoCode: string | undefined,
        userId: string,
    ): Promise<number> {
        if (!promoCode || typeof promoCode !== 'string' || promoCode.length === 0) {
            return 0.0;
        }

        let promo: PromoApiModel;
        try {
            promo = await this.promoService.validate(promoCode, userId);
        } catch (error) {
            console.warn(error);
            console.debug(
                `Promo code '${promoCode}' is invalid or not applicable for user ${userId}`,
            );
            return 0.0;
        }

        const discount = promo.discount;

        console.debug(`Promo code '${promoCode}' applied with discount ${discount}`);
        return discount;
    }
}
