import { NextFunction, Response, Request } from "express";
import { injectable } from "tsyringe";
import { Http } from "../../../common/utils";
import { addArticleSchema, deleteArticleSchema, getArticleSchema } from "../validation";
import { AddArticleService, GetArticleService, GetArticlesService, UpdateArticleService } from "../services/admin";
import DeleteArticleService from "../services/admin/deletearticle.service";

@injectable()
export default class ArticleController {
    constructor(
        private httpService: Http,
        private addArticleService: AddArticleService,
        private updateArticleService: UpdateArticleService,
        private deleteArticleService: DeleteArticleService,
        private getArticleService: GetArticleService,
        private getArticlesService: GetArticlesService
    ) {

    }

    async addArticle(req: Request, res: Response, next: NextFunction){
        try{
            addArticleSchema.parse(req.body);

            const { files } = req;
            

            const response = await this.addArticleService.execute({
                ...req.body,
                files
            });
           
            this.httpService.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully added article",
                data: response
            });
        }catch(err: any){
            next(err);
        }
    }

    async updateArticle(req: Request, res: Response, next: NextFunction){
        try{

            const { files } = req;

            const { id } = req.params;
            

            const response = await this.updateArticleService.execute(id, {
                ...req.body,
                files
            });
           
            this.httpService.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully update article",
                data: response
            });
        }catch(err: any){
            next(err);
        }
    }

    async deleteArticle(req: Request, res: Response, next: NextFunction){
        try{
            deleteArticleSchema.parse(req.params);

            const { id } = req.params;

            await this.deleteArticleService.execute(id);
           
            this.httpService.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully delete article"
            });
        }catch(err: any){
            next(err);
        }
    }

    async getArticle(req: Request, res: Response, next: NextFunction){
        try{
            getArticleSchema.parse(req.params);

            const { id } = req.params;

            const response = await this.getArticleService.execute(id);
           
            this.httpService.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully get article",
                data: response
            });
        }catch(err: any){
            next(err);
        }
    }

    async getArticles(req: Request, res: Response, next: NextFunction){
        try{

            const response = await this.getArticlesService.execute();
           
            this.httpService.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully get articles",
                data: response
            });
        }catch(err: any){
            next(err);
        }
    }
}