import "reflect-metadata";
import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import BlogController from "../controller/admin/blog.controller";

const customerBlogRouter = Router();
const customerBlogController = container.resolve(BlogController);

customerBlogRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => customerBlogController.getBlog(req, res, next));
customerBlogRouter.get("/", (req: Request, res: Response, next: NextFunction) => customerBlogController.getBlogs(req, res, next));

export default customerBlogRouter;            