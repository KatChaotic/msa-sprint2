import { Injectable } from '@nestjs/common';
import { BaseApiClientService } from './BaseHttpService';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PromoApiModel, PromoValidatePayload } from 'src/models/PromoApiModel';

const PROMO_SERVICE_URL_CONFIG_KEY = 'PROMO_SERVICE_API_URL';

@Injectable()
export class PromoService extends BaseApiClientService {
    constructor(httpService: HttpService, configService: ConfigService) {
        super(PROMO_SERVICE_URL_CONFIG_KEY, httpService, configService);
    }

    validate(promoCode: string, userId: string): Promise<PromoApiModel> {
        return this.postRequest<PromoApiModel, PromoValidatePayload>(`/api/promos/validate`, {
            code: promoCode,
            userId: userId,
        });
    }
}
