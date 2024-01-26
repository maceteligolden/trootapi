import { Schema, model } from "mongoose";
import { User } from "../models";
import { roles } from "../../constants";

const userschema: Schema =   new Schema<User>({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: roles,
        required: true
    },
    createdby: {
        type: Schema.Types.ObjectId,
        ref: "User",
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

export default model<User>("User", userschema);