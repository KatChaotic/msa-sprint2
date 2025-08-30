export interface PromoApiModel {
    code: string;
    discountPercent: number;
    active: boolean;
    vipOnly: boolean;
}

export interface PromoValidatePayload {
    code: string;
    userId: string;
}
