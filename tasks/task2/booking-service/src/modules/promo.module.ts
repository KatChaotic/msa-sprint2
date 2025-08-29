import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PromoService } from 'src/services/promo.service';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
        }),
    ],
    providers: [PromoService],
    exports: [PromoService],
})
export class PromoModule {}
