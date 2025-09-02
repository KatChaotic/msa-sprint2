import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'booking' })
export class BookingHistoryEntity {
    @PrimaryColumn({ name: 'id', type: 'bigint' })
    public id: string;

    @Column({ name: 'user_id' })
    public userId: string;

    @Column({ name: 'hotel_id' })
    public hotelId: string;

    @Column({ name: 'promo_code', nullable: true })
    public promoCode?: string;

    @Column({ name: 'discount_percent' })
    public discountPercent: number;

    @Column({ name: 'price' })
    public price: number;

    @Column({ name: 'created_at', type: 'date' })
    public createdAt: Date;
}
