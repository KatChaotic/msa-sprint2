export interface PromoApiModel {
    code: string;
    discount: number;
    vipOnly: boolean;
    expired: boolean;
    validUntil: string;
    description: string;
}

export interface PromoValidatePayload {
    code: string;
    userId: string;
}
