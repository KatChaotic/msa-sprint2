import { DataSource } from 'typeorm';
import { BookingHistoryEntity } from '../entities/BookingHistoryEntity';

export const bookingProviders = [
    {
        provide: 'BOOKING_HISTORY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BookingHistoryEntity),
        inject: ['DATA_SOURCE'],
    },
];
