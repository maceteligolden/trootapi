import { Article } from "./article.model";
import { Base } from "./base.model";

export interface Transaction extends Base {
    reference_no?: string;
    status?: string;
    customer_email?: string;
    customer_firstname?: string;
    customer_lastname?: string;
    customer_address?: string;
    articles?: Article[];
    amount?: string;
    payment_provider?: string;
    transaction_type?: string;
}