import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const GRPC_PROTO_PATH = './booking.proto';

const BOOKING_GRPC_SERVICE_HOST = process.env.BOOKING_GRPC_SERVICE_HOST || 'localhost';
const BOOKING_GRPC_SERVICE_PORT = process.env.BOOKING_GRPC_SERVICE_PORT || '5000';

const packageDefinition = protoLoader.loadSync(
    GRPC_PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const bookingPackage = protoDescriptor.booking;

const bookingServiceClient = new bookingPackage.BookingService(`${BOOKING_GRPC_SERVICE_HOST}:${BOOKING_GRPC_SERVICE_PORT}`, grpc.credentials.createInsecure());

export async function getBookingsByUserId(userId) {
    return new Promise((resolve, reject) => {
        console.log('[BookingService] getBookingsByUserId', userId);
        bookingServiceClient.ListBookings({ user_id: userId }, (error, response) => {
            if (error) {
                console.error('[BookingService] getBookingsByUserId', error);
                reject(error);
                return;
            }

            resolve(response.bookings);
        });
    });
}
