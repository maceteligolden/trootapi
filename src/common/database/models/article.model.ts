import { Base } from "./base.model";

export interface Article extends Base {
    title?: string;
    description?: string;
    category?: string;
    key?: string;
    uploader?: string;
}