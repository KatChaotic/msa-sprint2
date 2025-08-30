export interface BookingResponse {
    id: string;
    userId: string;
    hotelId: string;
    promoCode?: string;
    discountPercent: number;
    price: number;
    /**
     * ISO-8601
     */
    createdAt: string;
}
