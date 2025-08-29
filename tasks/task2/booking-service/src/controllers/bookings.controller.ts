import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BookingEntity } from 'src/entities/BookingEntity';
import type { BookingListRequest } from 'src/models/BookingListRequest';
import type { BookingListResponse } from 'src/models/BookingListResponse';
import { BookingResponse } from 'src/models/BookingResponse';
import { BookingService } from 'src/services/booking.service';

function mapEntityToBookingResponse(booking: BookingEntity): BookingResponse {
    return {
        id: booking.id,
        user_id: booking.userId,
        hotel_id: booking.hotelId,
        promo_code: booking.promoCode,
        discount_percent: booking.discountPercent,
        price: booking.price,
        created_at: booking.createdAt.toISOString(),
    };
}

@Controller()
export class BookingsController {
    constructor(private readonly bookingService: BookingService) {}

    @GrpcMethod('BookingService', 'ListBookings')
    async getListBookings(request: BookingListRequest): Promise<BookingListResponse> {
        const bookingEntities = await this.bookingService.findByUserId(request.user_id);

        return {
            bookings: bookingEntities.map(mapEntityToBookingResponse),
        };
    }
}
