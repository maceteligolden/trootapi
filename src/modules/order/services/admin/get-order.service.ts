import { injectable } from "tsyringe";
import { Order } from "../../../../common/database/models/order.model";
import OrderRepository from "../../../../common/database/repositories/order.repository";

@injectable()
export default class GetOrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {

    }

    async execute(orderId: string): Promise<any> {
        
    }
}