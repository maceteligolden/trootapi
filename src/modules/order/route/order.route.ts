import {  NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import OrderController from "../controller/order.controller";

const orderRouter = Router();
const orderController = container.resolve(OrderController);

orderRouter.get("/", (req: Request, res: Response, next: NextFunction)=>orderController.getOrders(req, res, next));
orderRouter.post("/placeorder", (req: Request, res: Response, next: NextFunction)=>orderController.placeOrder(req, res, next))
orderRouter.post("/freedownload", (req: Request, res: Response, next: NextFunction)=>orderController.freeDownload(req, res, next))

export default orderRouter;