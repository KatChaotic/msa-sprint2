import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import path from 'path';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: 'booking',
            protoPath: path.resolve(__dirname, './proto/booking.proto'),
            url: '0.0.0.0:5000',
        },
    });

    await app.listen();
}
bootstrap();
