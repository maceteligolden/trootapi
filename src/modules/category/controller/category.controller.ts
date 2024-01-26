import { injectable } from "tsyringe";
import { Http } from "../../../common/utils";
import { AddCategoryService, DeleteCategoryService, GetCategoryService } from "../services/admin";
import { NextFunction, Response, Request } from "express";
import { AddCategorySchema, DeleteCategorySchema, GetCategorySchema, UpdateCategorySchema } from "../validation";
import UpdateCategoryService from "../services/admin/updatecategory.service";
import { CategoryTypes } from "../../../common/constants";

@injectable()
export default class CategoryController {
    constructor(
        private http: Http,
        private addCategoryService: AddCategoryService,
        private deleteCategoryService: DeleteCategoryService,
        private updateCategoryService: UpdateCategoryService,
        private getCategoryService: GetCategoryService
    ){

    }

    async addCategory(req: Request, res: Response, next: NextFunction) {
        try {
            AddCategorySchema.parse(req.body);

            const { name, description, type } = req.body;

            const response = await this.addCategoryService.execute({
                name,
                description,
                type
            });

            this.http.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully added category",
                data: response
            });
        } catch (err: any){
            next(err)
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            DeleteCategorySchema.parse(req.params);

            const { id } = req.params;

            const response = await this.deleteCategoryService.execute(id);

            this.http.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully deleted category",
                data: response
            });
        } catch (err: any){
            next(err)
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            UpdateCategorySchema.parse(req.body);

            const { id } = req.params;

            const { name, description } = req.body;

            const response = await this.updateCategoryService.execute(id, {
                name,
                description
            });

            this.http.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully updated category",
                data: response
            });
        } catch (err: any){
            next(err)
        }
    }

    async getCategory(req: Request, res: Response, next: NextFunction) {
        try {
            GetCategorySchema.parse(req.params);

            const { type }  = req.params;

            const response = await this.getCategoryService.execute(type as CategoryTypes);

            this.http.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully get category",
                data: response
            });
        } catch (err: any){
            next(err)
        }
    }
}