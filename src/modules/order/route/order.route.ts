import {  NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import OrderController from "../controller/order.controller";

const orderRouter = Router();
const orderController = container.resolve(OrderController);

orderRouter.get("/", (req: Request, res: Response, next: NextFunction)=>orderController.getOrders(req, res, next));

export default orderRouter;