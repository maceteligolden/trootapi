import { Schema, model } from "mongoose";
import { Category } from "../models";
import { CategoryTypes } from "../../constants";

const categoryschema: Schema =   new Schema<Category>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: CategoryTypes,
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

export default model<Category>("Category", categoryschema);