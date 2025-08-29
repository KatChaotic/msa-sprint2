export interface BookingResponse {
    id: string;
    user_id: string;
    hotel_id: string;
    promo_code?: string;
    discount_percent: number;
    price: number;
    /**
     * ISO-8601
     */
    created_at: string;
}
