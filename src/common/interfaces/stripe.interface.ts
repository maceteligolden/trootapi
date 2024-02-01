export interface IAddBank {
    email: string;
    account_id: string;
    routing_number: string;
    account_number: string;
    account_name: string;
    token?: string;
}

export interface IInitializePayment {
    reference: string,
    items: { price: string, quantity: number}[],
}