import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
        }),
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
