export interface BookingCreatedEvent {
    id: string;
    userId: string;
    hotelId: string;
    promoCode?: string;
    discountPercent: number;
    price: number;
    createdAt: string;
}
