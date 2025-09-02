import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { bookingProviders } from 'src/providers/booking.providers';
import { BookingHistoryService } from 'src/services/bookingHistory.service';

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [...bookingProviders, BookingHistoryService],
    exports: [BookingHistoryService],
})
export class BookingHistoryModule {}
