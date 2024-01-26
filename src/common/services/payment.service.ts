import { injectable } from "tsyringe";
import StripeHelper from "../helper/stripe.helper";

export interface IPaymentProvider {

}

@injectable()

export default class PaymentService {
    constructor(
        private stripeHelper: StripeHelper
    ){

    }

    async authorizeAddCard(type: IPaymentProvider, metadata: any){

    }

    async chargeCard(type: IPaymentProvider, metadata: any){
        
    }
}