import { Injectable } from '@nestjs/common';
import { BaseApiClientService } from './BaseHttpService';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

const REVIEWS_SERVICE_API_CONFIG_KEY = 'REVIEWS_SERVICE_API_URL';

@Injectable()
export class ReviewsService extends BaseApiClientService {
    constructor(httpService: HttpService, configService: ConfigService) {
        super(REVIEWS_SERVICE_API_CONFIG_KEY, httpService, configService);
    }

    async isTrustedHotel(hotelId: string): Promise<boolean> {
        return this.getRequest<boolean>(`/api/reviews/hotel/${hotelId}/trusted`);
    }
}
