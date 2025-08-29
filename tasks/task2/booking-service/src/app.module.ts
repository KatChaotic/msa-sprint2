import { Module } from '@nestjs/common';
import { BookingModule } from './modules/booking.module';
import { BookingsController } from './controllers/bookings.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), BookingModule],
    controllers: [BookingsController],
})
export class AppModule {}
