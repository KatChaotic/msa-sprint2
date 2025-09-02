import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BookingEntity } from 'src/entities/BookingEntity';
import type { BookingListRequest } from 'src/models/BookingListRequest';
import type { BookingListResponse } from 'src/models/BookingListResponse';
import type { BookingRequest } from 'src/models/BookingRequest';
import type { BookingResponse } from 'src/models/BookingResponse';
import { BookingService } from 'src/services/booking.service';

function mapEntityToBookingResponse(booking: BookingEntity): BookingResponse {
    return {
        id: booking.id,
        userId: booking.userId,
        hotelId: booking.hotelId,
        promoCode: booking.promoCode,
        discountPercent: booking.discountPercent,
        price: booking.price,
        createdAt: booking.createdAt.toISOString(),
    };
}

@Controller()
export class BookingsController {
    constructor(private readonly bookingService: BookingService) {}

    @GrpcMethod('BookingService', 'ListBookings')
    async getListBookings(request: BookingListRequest): Promise<BookingListResponse> {
        const bookingEntities = await this.bookingService.findByUserId(request.userId);

        return {
            bookings: bookingEntities.map(mapEntityToBookingResponse),
        };
    }

    @GrpcMethod('BookingService', 'CreateBooking')
    async createBooking(request: BookingRequest): Promise<BookingResponse | null> {
        const result = await this.bookingService.createBooking(
            request.userId,
            request.hotelId,
            request.promoCode,
        );
        if (!result) {
            return null;
        }

        return mapEntityToBookingResponse(result);
    }
}
