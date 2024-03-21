import { Response, Request, NextFunction } from "express";
import { injectable } from "tsyringe";
import { Http } from "../../../common/utils";
import GetOrdersService from "../services/admin/get-orders.service";
import PlaceOrderService, { IPlaceOrderInput } from "../services/place-order.service";

@injectable()
export default class OrderController {
    constructor(
        private httpService: Http,
        private getOrdersService: GetOrdersService,
        private placeOrderService: PlaceOrderService
    ){

    }

    async getOrders(req: Request, res: Response, next: NextFunction) {
        try{ 

            const response = await this.getOrdersService.execute();
           
            this.httpService.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully get all orders",
                data: response
            });
        }catch(err: any){
            next(err);
        }
    }

    async placeOrder(req: Request, res: Response, next: NextFunction){
        try {

            const { firstname, lastname, email, phone, items } = req.body;
            console.log(req.body);
            const payload: IPlaceOrderInput = {
                firstname,
                lastname,
                email,
                phone,
                items
            }

            const response = await this.placeOrderService.execute(payload);
           
            this.httpService.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully placed orders",
                data: response
            });
        } catch(err){
            next(err)
        }
    }
}