import { Injectable, Inject } from '@nestjs/common';
import { BookingHistoryEntity } from 'src/entities/BookingHistoryEntity';
import { BookingCreatedEvent } from 'src/models/BookingCreatedEvent';
import { Repository } from 'typeorm';

function mapCreatedEventToEntity(event: BookingCreatedEvent): BookingHistoryEntity {
    const entity = new BookingHistoryEntity();
    entity.id = event.id;
    entity.userId = event.userId;
    entity.hotelId = event.hotelId;
    entity.promoCode = event.promoCode;
    entity.discountPercent = event.discountPercent;
    entity.price = event.price;
    entity.createdAt = new Date(event.createdAt);

    return entity;
}

@Injectable()
export class BookingHistoryService {
    constructor(
        @Inject('BOOKING_HISTORY_REPOSITORY')
        private readonly bookingRepository: Repository<BookingHistoryEntity>,
    ) {}

    async findAll(): Promise<BookingHistoryEntity[]> {
        return this.bookingRepository.find();
    }

    async findByUserId(userId: string): Promise<BookingHistoryEntity[]> {
        return this.bookingRepository.findBy({ userId });
    }

    async createBookingHistory(event: BookingCreatedEvent): Promise<BookingHistoryEntity> {
        const entity = mapCreatedEventToEntity(event);

        await this.bookingRepository.save(entity);

        return entity;
    }
}
