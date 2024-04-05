import { Schema, model } from "mongoose";
import { Article, Transaction } from "../models";
import { PaymentProviders, TransactionStatus, TransactionType } from "../../constants/transaction.constant";

const transactionschema: Schema =   new Schema<Transaction>({
    reference_no: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true,
    },
    articles: [
        new Schema<Article>({
            title: String,
            description: String,
            category: String,
            key: String,
            uploader: String,
            amount: String
        })
    ],
    status: {
        type: String,
        enum: [TransactionStatus.FAILED, TransactionStatus.INITIALIZED, TransactionStatus.SUCCESSFUL, TransactionStatus.EXPIRED],
        default: TransactionStatus.INITIALIZED,
        required: true
    },
    payment_provider: {
        type: String,
        enum: [PaymentProviders.STRIPE],
        default: PaymentProviders.STRIPE,
        required: true
    },
    transaction_type: {
        type: String,
        enum: [TransactionType.PURCHASE, TransactionType.REFUND, TransactionType.FREEDOWNLOAD],
        required: true
    },
    customer_email: {
        type: String,
    },
    customer_firstname: {
        type: String,
    },
    customer_lastname: {
        type: String,
    },
    customer_phone: {
        type: String,
    },
    created_at: {
        type: Date,
        default: function(){
            return Date.now();
        }
    },
    updated_at: {
        type: Date,
        required: true,
        default: function(){
            return Date.now();
        }
    }
});

export default model<Transaction>("Transaction", transactionschema);