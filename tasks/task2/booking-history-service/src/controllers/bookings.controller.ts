import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import type { BookingCreatedEvent } from 'src/models/BookingCreatedEvent';
import { BookingHistoryService } from 'src/services/bookingHistory.service';

const BOOKING_CREATED_TOPIC = 'booking_created';

@Controller()
export class BookingsController {
    constructor(
        private readonly logger: Logger,
        private readonly bookingHistoryService: BookingHistoryService,
    ) {}

    @MessagePattern(BOOKING_CREATED_TOPIC)
    async handleBookingCreatedEvent(@Payload() payload: BookingCreatedEvent) {
        this.logger.log(`Received event ${JSON.stringify(payload)}`, BookingsController.name);

        try {
            await this.bookingHistoryService.createBookingHistory(payload);
        } catch (error) {
            this.logger.error(error, BookingsController.name);
        }
    }
}
