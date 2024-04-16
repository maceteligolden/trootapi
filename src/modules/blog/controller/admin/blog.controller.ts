import { Request, Response, NextFunction } from "express";
import { injectable } from "tsyringe";
import { Http } from "../../../../common/utils";
import { CreateBlogService, GetBlogService, GetBlogsService, DeleteBlogService, UpdateBlogService } from "../../services";
import { UploadedFile } from "express-fileupload";

@injectable()
export default class BlogController {
    constructor(
        private http: Http,
        private createBlogService: CreateBlogService,
        private getBlogService: GetBlogService,
        private getBlogsService: GetBlogsService,
        private deleteBlogService: DeleteBlogService,
        private updateBlogService: UpdateBlogService
    ){

    }

    async createBlog(req: Request, res: Response, next: NextFunction){
        try {

            //TODO: add validation 
            console.log(req)

            const files: UploadedFile[] | any = req.files;
            const response = await this.createBlogService.execute({...req.body, thumbnail: files.thumbnail[0].key});

            this.http.Response({
                res,
                status: "success",
                message: "successfully added blog post",
                data: response
            })
        } catch(err){
            next(err)
        }
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

    async deleteBlog(req: Request, res: Response, next: NextFunction){
        try {

            //TODO: add validation

            const { id } = req.params;

            await this.deleteBlogService.execute(id);

            this.http.Response({
                res,
                status: "success",
                message: "successfully deleted blog post"
            })
        } catch(err){
            next(err)
        }
    }

    async updateBlog(req: Request, res: Response, next: NextFunction){
        try {

            //TODO: add validation

            const { id } = req.params;


            const response = await this.updateBlogService.execute(id, req.body);

            this.http.Response({
                res,
                status: "success",
                message: "successfully update blog post",
                data: response
            })
        } catch(err){
            next(err)
        }
    }

}