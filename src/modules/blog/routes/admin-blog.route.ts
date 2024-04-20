import "reflect-metadata";
import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import BlogController from "../controller/admin/blog.controller";
import { fileMiddleware } from "../../../common/middlewares";

const adminBlogRouter = Router();
const adminBlogController = container.resolve(BlogController);

adminBlogRouter.post("/create",  fileMiddleware.fields([{ name: 'thumbnail', maxCount: 1 }]), (req: Request, res: Response, next: NextFunction)=>adminBlogController.createBlog(req, res, next));
adminBlogRouter.patch("/:id", fileMiddleware.fields([{ name: 'thumbnail', maxCount: 1 }]),(req: Request, res: Response, next: NextFunction) => adminBlogController.updateBlog(req, res, next));
adminBlogRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) => adminBlogController.deleteBlog(req, res, next));
adminBlogRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => adminBlogController.getBlog(req, res, next));
adminBlogRouter.get("/", (req: Request, res: Response, next: NextFunction) => adminBlogController.getBlogs(req, res, next));

export default adminBlogRouter;            