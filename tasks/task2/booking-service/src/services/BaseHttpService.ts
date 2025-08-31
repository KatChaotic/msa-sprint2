import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import qs from 'query-string';

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

    protected async postRequest<TResult, TPayload = object>(
        path: string,
        data?: TPayload,
    ): Promise<TResult> {
        const endpoint = this.configService.getOrThrow<string>(this.endpointConfigKey);

        const response = await firstValueFrom(
            this.httpService.post<TResult>(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                `${endpoint}${path}?${qs.stringify(data as any)}`,
            ),
        );

        return response.data;
    }
}
