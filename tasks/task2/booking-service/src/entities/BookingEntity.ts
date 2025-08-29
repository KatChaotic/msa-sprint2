import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookingEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public userId: string;

    @Column()
    public hotelId: string;

    @Column()
    public promoCode: string;

    @Column()
    public discountPercent: number;

    @Column()
    public price: number;

    @CreateDateColumn()
    public createdAt: Date;
}
