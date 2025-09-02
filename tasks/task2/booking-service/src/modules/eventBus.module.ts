import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventBusService } from 'src/services/eventBus.service';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'EVENT_BUS_PRODUCER_SERVICE',
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'booking-service-producer',
                            brokers: configService.getOrThrow<string>('KAFKA_BROKERS').split(','),
                        },
                        producer: {
                            allowAutoTopicCreation: true,
                            idempotent: true,
                            retry: {
                                retries: 5,
                                maxRetryTime: 30000,
                            },
                        },
                        producerOnlyMode: true,
                    },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    providers: [EventBusService, Logger],
    exports: [EventBusService],
})
export class EventBusModule {}
