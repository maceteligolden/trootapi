import { env } from "../config/env.config";
import { injectable } from "tsyringe";
import { IAddBank } from "../interfaces";

const stripe = require("stripe")(`${env.STRIPE.TEST_API_KEY}`);

@injectable()
export default class StripeHelper {

    constructor(){

    }

    /**
     * This function initializing the add card process
     * @param customer 
     * @returns 
     */
    async setupIntent(customer: string) {
        return await stripe.setupIntents.create({
            customer
        });
    }

    /**
     * This funcion creates customer account in stripe 
     * @param email 
     * @param name 
     * @returns 
     */
    async createCustomer(email: string, name: string) {
        const customer = await stripe.customers.create({
            email,
            name,
        });

        return {
            customer
        };
    }

    async createAccount(email: string) {

        const account =  await stripe.accounts.create({
            type: "custom",
            country: "US",
            email,
            capabilities: {
                card_payments: {requested: true},
                transfers: {requested: true},
            },
        });

        // console.log('account' + account)

        return {
            account
        };
    }

    /**
     * initializing charging a card
     * @param customer 
     * @param amount 
     * @param payment_method 
     * @returns 
     */
    async paymentIntent(customer: string, amount: number, payment_method: string, invoice_id: string): Promise<any> {

        const calculated_amount = amount;

        return await stripe.paymentIntents.create({
            amount: calculated_amount,
            currency: "usd",
            payment_method,
            metadata: {
                invoice_id
            },
            payment_method_types: ["card"],
            customer
        });
    }

    /**
     * 
     * @param args 
     * @returns 
     */
    async addBank(args: IAddBank) {
        return stripe.accounts.createExternalAccount(
            args.account_id,
            {
                external_account: {
                    object: "bank_account",
                    country: "US",
                    currency: "usd", 
                    account_holder_name: args.account_name,
                    account_holder_type: "individual",
                    routing_number: args.routing_number, 
                    account_number: args.account_number
                },
            }
        );
    }

    /**
     * 
     * @param customer_id 
     * @param bank_account 
     * @returns 
     */
    async deleteBank(customer_id: string, bank_account: string) {
        return await stripe.customers.deleteSource(
            customer_id,
            bank_account
        );
    }

    /**
     * 
     * @param id 
     * @param payment_id 
     * @returns 
     */
    async paymentConfirm(id: string, payment_id: string) {
        return await stripe.paymentIntents.confirm(
            id,
            {payment_method: payment_id}
        );
    }

    /**
     * 
     * @param payment_method_id 
     * @returns 
     */
    async fetchCardDetails(payment_method_id: string){
        return await stripe.paymentMethods.retrieve(
            payment_method_id
        );
    }

    /**
     * 
     * @param payment_method_id 
     * @returns 
     */
    async deleteCard(payment_method_id: string) {
        return await stripe.paymentMethods.detach(
            payment_method_id
        );
    }

    async createPayout(amount: number, bank_account: string) {
        return await stripe.payouts.create({
            amount,
            currency: "usd",
            destination: bank_account
        });
    }

}