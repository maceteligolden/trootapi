import "reflect-metadata";
import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import CategoryController from "../controller/category.controller";

const categoryRouter = Router();
const categoryController = container.resolve(CategoryController);

categoryRouter.post("/create", (req: Request, res: Response, next: NextFunction)=> categoryController.addCategory(req, res, next));
categoryRouter.delete("/:id", (req: Request, res: Response, next: NextFunction)=> categoryController.deleteCategory(req, res, next));
categoryRouter.patch("/:id", (req: Request, res: Response, next: NextFunction)=> categoryController.updateCategory(req, res, next));
categoryRouter.get("/:type", (req: Request, res: Response, next: NextFunction)=> categoryController.getCategory(req, res, next));

export default categoryRouter;    