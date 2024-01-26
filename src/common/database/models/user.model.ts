import { Schema } from "mongoose";
import { Base } from "./base.model";

export interface User extends Base {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    role?: string;
    createdby?: Schema.Types.ObjectId
}