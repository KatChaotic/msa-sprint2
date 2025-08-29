import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { bookingProviders } from 'src/providers/booking.providers';
import { BookingService } from 'src/services/booking.service';
import { UsersModule } from './users.module';
import { HotelsModule } from './hotels.module';
import { ReviewsModule } from './reviews.module';
import { PromoModule } from './promo.module';

@Module({
    imports: [DatabaseModule, UsersModule, HotelsModule, ReviewsModule, PromoModule],
    providers: [...bookingProviders, BookingService],
    exports: [BookingService],
})
export class BookingModule {}
