import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookingEntity } from '../entities/BookingEntity';
import { UsersService } from './users.service';
import { ReviewsService } from './reviews.service';
import { PromoService } from './promo.service';
import { HotelsService } from './hotels.service';

@Injectable()
export class BookingService {
    constructor(
        @Inject('BOOKING_REPOSITORY')
        private readonly bookingRepository: Repository<BookingEntity>,
        private readonly usersService: UsersService,
        private readonly hotelsService: HotelsService,
        private readonly reviewsService: ReviewsService,
        private readonly promoService: PromoService,
    ) {}

    async findAll(): Promise<BookingEntity[]> {
        return this.bookingRepository.find();
    }

    async findByUserId(userId: string): Promise<BookingEntity[]> {
        // await this.usersService.isUserActive(userId);

        return this.bookingRepository.findBy({ userId });
    }

    async createBooking(userId: string, hotelId: string, promoCode?: string): Promise<BookingEntity> {
        const entity = new BookingEntity();
        entity.userId = userId;
        entity.hotelId = hotelId;
        entity.promoCode = promoCode;

        await this.bookingRepository.insert(entity);

        return entity;
    }
}
