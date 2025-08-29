import { Injectable } from '@nestjs/common';
import { BaseApiClientService } from './BaseHttpService';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PromoApiModel } from 'src/models/PromoApiModel';

const PROMO_SERVICE_URL_CONFIG_KEY = 'PROMO_SERVICE_URL';

@Injectable()
export class PromoService extends BaseApiClientService {
    constructor(httpService: HttpService, configService: ConfigService) {
        super(PROMO_SERVICE_URL_CONFIG_KEY, httpService, configService);
    }

    validate(promoId: string): Promise<PromoApiModel> {
        return this.getRequest<PromoApiModel>(`/api/promos/${promoId}/validate`);
    }
}
