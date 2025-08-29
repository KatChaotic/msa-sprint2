import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { bookingProviders } from 'src/providers/booking.providers';
import { BookingService } from 'src/services/booking.service';

@Module({
    imports: [DatabaseModule],
    providers: [...bookingProviders, BookingService],
    exports: [BookingService],
})
export class BookingModule {}
