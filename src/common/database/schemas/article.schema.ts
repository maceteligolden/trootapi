import { Schema, model } from "mongoose";
import { Article, Tag } from "../models";
import { CategoryTypes, PaymentModel } from "../../constants";

const articleschema: Schema =   new Schema<Article>({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    payment_model: {
        type: String,
        enum: [ PaymentModel.FREE, PaymentModel.PREMIUM],
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    tags: [new Schema<Tag>({
        name: String
    })],
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

export default model<Article>("Article", articleschema);