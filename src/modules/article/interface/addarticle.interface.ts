import { PaymentModel } from "../../../common/constants";

export interface IAddArticleInput {
    title: string;
    description: string;
    category: string;
    uploader: string;
    payment_model: PaymentModel;
    files: any;
}