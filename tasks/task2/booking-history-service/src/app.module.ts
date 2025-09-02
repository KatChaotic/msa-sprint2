import { Logger, Module } from '@nestjs/common';
import { BookingHistoryModule } from './modules/bookingHistory.module';
import { ConfigModule } from '@nestjs/config';
import { BookingsController } from './controllers/bookings.controller';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
        BookingHistoryModule,
    ],
    providers: [Logger],
    controllers: [BookingsController],
})
export class AppModule {}
