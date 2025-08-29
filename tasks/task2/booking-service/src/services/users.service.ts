import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseApiClientService } from './BaseHttpService';

const USERS_SERVICE_URL_CONFIG_KEY = 'USERS_SERVICE_API_URL';

@Injectable()
export class UsersService extends BaseApiClientService {
    constructor(httpService: HttpService, configService: ConfigService) {
        super(USERS_SERVICE_URL_CONFIG_KEY, httpService, configService);
    }

    async isUserActive(userId: string): Promise<boolean> {
        return this.getRequest<boolean>(`/api/users/${userId}/active`);
    }

    async isUserBlacklisted(userId: string): Promise<boolean> {
        return this.getRequest<boolean>(`/api/users/${userId}/blacklisted`);
    }

    async getUserStatus(userId: string): Promise<string> {
        return this.getRequest<string>(`/api/users/${userId}/status`);
    }
}
