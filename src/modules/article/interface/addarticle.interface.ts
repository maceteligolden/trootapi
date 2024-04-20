import { PaymentModel } from "../../../common/constants";
import { Tag } from "../../../common/database/models";

export interface IAddArticleInput {
    title: string;
    description: string;
    amount?: string;
    category: string;
    uploader: string;
    payment_model: PaymentModel;
    files: any;
    tags: string;
}