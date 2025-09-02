import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { BookingCreatedEvent } from 'src/models/BookingCreatedEvent';
import { BookingService } from './booking.service';
import { firstValueFrom } from 'rxjs';

const BOOKING_CREATED_TOPIC = 'booking_created';

@Injectable()
export class EventBusService implements OnModuleInit, OnModuleDestroy {
    constructor(
        @Inject('EVENT_BUS_PRODUCER_SERVICE') private readonly kafkaClient: ClientKafka,
        private readonly logger: Logger,
    ) {}

    async onModuleInit() {
        // Connect the client when the module initializes
        try {
            await this.kafkaClient.connect();
            this.logger.log('Kafka Producer Client connected successfully', EventBusService.name);
        } catch (error) {
            this.logger.error(
                'Failed to connect Kafka Producer Client',
                error,
                EventBusService.name,
            );
        }
    }

    async onModuleDestroy() {
        // Disconnect the client when the application shuts down
        await this.kafkaClient.close();
        this.logger.log('Kafka Producer Client disconnected', EventBusService.name);
    }

    async bookingCreated(booking: BookingCreatedEvent): Promise<void> {
        try {
            this.logger.log(
                `Publishing event to topic [${BOOKING_CREATED_TOPIC}]`,
                EventBusService.name,
            );

            await firstValueFrom(
                this.kafkaClient.emit(BOOKING_CREATED_TOPIC, JSON.stringify(booking)),
            );
        } catch (error) {
            this.logger.error(
                `Failed to publish event to topic [${BOOKING_CREATED_TOPIC}]`,
                error,
                BookingService.name,
            );

            throw error;
        }
    }
}
