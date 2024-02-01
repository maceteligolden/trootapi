import { Request, Response, NextFunction } from "express";
import { injectable } from "tsyringe";
import { Http } from "../../../../common/utils";
import { GetBlogService, GetBlogsService } from "../../services";

@injectable()
export default class BlogController {
    constructor(
        private http: Http,
        private getBlogService: GetBlogService,
        private getBlogsService: GetBlogsService
    ){

    }

    async getBlog(req: Request, res: Response, next: NextFunction){
        try {

            //TODO: add validation

            const { id } = req.params;

            const response = await this.getBlogService.execute(id);

            this.http.Response({
                res,
                status: "success",
                message: "successfully get blog post",
                data: response
            })
        } catch(err){
            next(err)
        }
    }

    async getBlogs(req: Request, res: Response, next: NextFunction){
        try {

            //TODO: add validation

            const response = await this.getBlogsService.execute();

            this.http.Response({
                res,
                status: "success",
                message: "successfully get all blog posts",
                data: response
            })
        } catch(err){
            next(err)
        }
    }
}