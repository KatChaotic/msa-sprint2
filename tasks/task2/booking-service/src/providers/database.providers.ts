import { DataSource } from 'typeorm';
import path from 'path';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: configService.getOrThrow('DB_HOST'),
                port: parseInt(configService.getOrThrow('DB_PORT')),
                username: configService.getOrThrow('DB_USER'),
                password: configService.getOrThrow('DB_PASSWORD'),
                database: configService.getOrThrow('DB_NAME'),
                entities: [path.resolve(__dirname, '../entities/**/*{.ts,.js}')],
                synchronize: true,
            });

            return dataSource.initialize();
        },
        inject: [ConfigService],
    },
];
