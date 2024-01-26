import "reflect-metadata";
import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import { ArticleController } from "../controller";
import { fileMiddleware } from "../../../common/middlewares";

const articleRouter = Router();
const articleController = container.resolve(ArticleController);

articleRouter.post("/add-article", fileMiddleware.array("files"), (req: Request, res: Response, next: NextFunction)=>articleController.addArticle(req, res, next));
articleRouter.patch("/update-article", fileMiddleware.array("files"), (req: Request, res: Response, next: NextFunction)=>articleController.updateArticle(req, res, next));
articleRouter.delete("/:id", (req: Request, res: Response, next: NextFunction)=>articleController.deleteArticle(req, res, next));
articleRouter.get("/:id", (req: Request, res: Response, next: NextFunction)=>articleController.getArticle(req, res, next));
articleRouter.get("/", (req: Request, res: Response, next: NextFunction)=>articleController.getArticles(req, res, next));

export default articleRouter;            