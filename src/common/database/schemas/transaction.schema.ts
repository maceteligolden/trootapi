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
        enum: [TransactionStatus.FAILED, TransactionStatus.INITIALIZED, TransactionStatus.SUCCESSFUL],
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
        enum: [TransactionType.PURCHASE, TransactionType.REFUND],
        required: true
    },
    customer_email: {
        type: String,
        required: true
    },
    customer_firstname: {
        type: String,
        required: true
    },
    customer_lastname: {
        type: String,
        required: true
    },
    customer_address: {
        type: String,
        required: true
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