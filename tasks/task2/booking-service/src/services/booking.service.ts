import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookingEntity } from '../entities/BookingEntity';

@Injectable()
export class BookingService {
    constructor(
        @Inject('BOOKING_REPOSITORY')
        private bookingRepository: Repository<BookingEntity>,
    ) {}

    async findAll(): Promise<BookingEntity[]> {
        return this.bookingRepository.find();
    }

    async findByUserId(userId: string): Promise<BookingEntity[]> {
        return this.bookingRepository.findBy({ userId });
    }
}
