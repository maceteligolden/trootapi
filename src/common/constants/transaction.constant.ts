export enum PaymentProviders {
    STRIPE = "STRIPE"
}

export enum TransactionStatus {
    INITIALIZED = "INITIALIZED",
    SUCCESSFUL = "SUCCESSFUL",
    FAILED = "FAILED",
    EXPIRED = "EXPIRED"
}

export enum TransactionType {
    PURCHASE = "PURCHASE",
    REFUND = "REFUND"
}