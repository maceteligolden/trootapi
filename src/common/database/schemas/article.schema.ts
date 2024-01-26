import { Schema, model } from "mongoose";
import { Article } from "../models";
import { CategoryTypes } from "../../constants";

const articleschema: Schema =   new Schema<Article>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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

export default model<Article>("Article", articleschema);