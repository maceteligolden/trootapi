import { env } from "../config/env.config";
import { injectable } from "tsyringe";
import { IInitializePayment } from "../interfaces/stripe.interface";

const stripe = require("stripe")(`${env.STRIPE.TEST_API_KEY}`);

@injectable()
export default class StripeHelper {

    constructor(){

    }

    async initializePayment(args: IInitializePayment) {
        return await stripe.checkout.sessions.create({
            client_reference_id: args.reference,
            success_url: process.env.STRIPE_SUCCESS_URL || 'https://example.com/success',
            line_items: args.items,
            mode: 'payment',
        });
    }

}