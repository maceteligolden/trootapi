import { Base } from "./base.model";

export interface Blog extends Base {
    thumbnail?: string;
    title?: string;
    content?: string;
    category?: string;
}