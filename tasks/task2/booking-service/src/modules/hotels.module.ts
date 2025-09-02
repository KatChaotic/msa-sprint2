import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HotelsService } from 'src/services/hotels.service';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
        }),
    ],
    providers: [HotelsService],
    exports: [HotelsService],
})
export class HotelsModule {}
