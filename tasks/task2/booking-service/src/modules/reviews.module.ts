import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ReviewsService } from 'src/services/reviews.service';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
        }),
    ],
    providers: [ReviewsService],
    exports: [ReviewsService],
})
export class ReviewsModule {}
