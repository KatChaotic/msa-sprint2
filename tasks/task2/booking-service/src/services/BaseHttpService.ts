import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

export abstract class BaseApiClientService {
    constructor(
        private endpointConfigKey: string,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    protected async getRequest<TResult>(path: string): Promise<TResult> {
        const endpoint = this.configService.getOrThrow<string>(this.endpointConfigKey);

        const response = await firstValueFrom(this.httpService.get<TResult>(`${endpoint}${path}`));

        return response.data;
    }
}
