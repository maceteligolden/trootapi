export enum PaymentProviders {
    STRIPE = "STRIPE"
}

export enum TransactionStatus {
    INITIALIZED = "INITIALIZED",
    SUCCESSFUL = "SUCCESSFUL",
    FAILED = "FAILED"
}

export enum TransactionType {
    PURCHASE = "PURCHASE",
    REFUND = "REFUND"
}