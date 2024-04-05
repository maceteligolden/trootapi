import { injectable } from "tsyringe";
import { Article } from "../../../common/database/models";
import { TransactionRepository } from "../../../common/database/repositories";
import { TransactionType } from "../../../common/constants/transaction.constant";
import { generateReference } from "../../../common/utils/reference-generator.util";
const stripe = require('stripe')(`${process.env.STRIPE_API_KEY}`);

export interface IPlaceOrderInput {
    items: Article[],
    firstname: string,
    lastname: string,
    email: string,
    phone: string
}

@injectable()
export default class PlaceOrderService {
    constructor(
        private transactionRepository: TransactionRepository,
    ){

    }

    async execute(args: IPlaceOrderInput){
        // get order details

        const lineItems: any[] = [];
        let transactionTotal = 0;
        
        args.items.map((item: Article) => {
            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                    name: item.title,
                    },
                    unit_amount: Number(item.amount) * 100
                },
                quantity: 1
            });

            transactionTotal = transactionTotal + Number(item.amount)
        })

        // add transaction table
        const generatedRef = generateReference("TRT"); 

        await this.transactionRepository.createTransaction({
            reference_no: generatedRef,
            amount: transactionTotal.toString(),
            articles: args.items,
            transaction_type: TransactionType.PURCHASE,
            customer_email: args.email,
            customer_firstname: args.firstname,
            customer_lastname: args.lastname,
            customer_phone: args.phone
        });

        // create order session
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.STRIPE_SUCCESS_URL}`,
            cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
            metadata: {
                reference: generatedRef
            }
        });

        return session;
    }
}