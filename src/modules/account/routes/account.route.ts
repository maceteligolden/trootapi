import "reflect-metadata";
import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import AccountController from "../controller/account.controller";

const accountRouter = Router();
const accountController = container.resolve(AccountController);

accountRouter.post("/create", (req: Request, res: Response, next: NextFunction)=> accountController.addAccount(req, res, next));

export default accountRouter;    