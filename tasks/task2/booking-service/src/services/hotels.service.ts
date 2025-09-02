import { Injectable } from '@nestjs/common';
import { BaseApiClientService } from './BaseHttpService';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

const HOTELS_SERVICE_URL_CONFIG_KEY = 'HOTELS_SERVICE_API_URL';

@Injectable()
export class HotelsService extends BaseApiClientService {
    constructor(httpService: HttpService, configService: ConfigService) {
        super(HOTELS_SERVICE_URL_CONFIG_KEY, httpService, configService);
    }

    async isHotelOperational(hotelId: string): Promise<boolean> {
        return this.getRequest<boolean>(`/api/hotels/${hotelId}/operational`);
    }

    async isHotelFullyBooked(hotelId: string): Promise<boolean> {
        return this.getRequest<boolean>(`/api/hotels/${hotelId}/fully-booked`);
    }
}
