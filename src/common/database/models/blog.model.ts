import { Base } from "./base.model";

export interface Blog extends Base {
    title?: string;
    content?: string;
    category?: string;
}