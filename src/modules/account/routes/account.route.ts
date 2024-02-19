import "reflect-metadata";
import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import AccountController from "../controller/account.controller";

const accountRouter = Router();
const accountController = container.resolve(AccountController);

accountRouter.post("/create", (req: Request, res: Response, next: NextFunction)=> accountController.addAccount(req, res, next));
accountRouter.delete("/:id", (req: Request, res: Response, next: NextFunction)=> accountController.deleteAccount(req, res, next));
accountRouter.get("/", (req: Request, res: Response, next: NextFunction)=> accountController.getAccounts(req, res, next));
accountRouter.get("/:id", (req: Request, res: Response, next: NextFunction)=> accountController.getAccount(req, res, next));
accountRouter.patch("/:id", (req: Request, res: Response, next: NextFunction)=> accountController.updateAccount(req, res, next));

export default accountRouter;    