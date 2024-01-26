import "reflect-metadata";
import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import AuthController from "../controller/auth.controller";

const authRouter = Router();
const authController = container.resolve(AuthController);

authRouter.post("/login", (req: Request, res: Response, next: NextFunction)=>authController.login(req, res, next));
authRouter.post("/register", (req: Request, res: Response, next: NextFunction) => authController.register(req, res, next));

export default authRouter;            