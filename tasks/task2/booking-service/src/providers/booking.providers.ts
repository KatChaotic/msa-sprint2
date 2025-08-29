import { DataSource } from 'typeorm';
import { BookingEntity } from '../entities/BookingEntity';

export const bookingProviders = [
    {
        provide: 'BOOKING_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BookingEntity),
        inject: ['DATA_SOURCE'],
    },
];
