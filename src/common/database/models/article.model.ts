import { PaymentModel } from "../../constants";
import { Base } from "./base.model";
import { Tag } from "./tag.model";

export interface Article extends Base {
    title?: string;
    description?: string;
    category?: string;
    payment_model?: PaymentModel;
    thumbnail?: string;
    key?: string;
    uploader?: string;
    amount?: string;
    tags?: Tag[]
}