import { Base } from "./base.model";

export interface Category extends Base {
    name?: string;
    description?: string;
    type?: string;
}