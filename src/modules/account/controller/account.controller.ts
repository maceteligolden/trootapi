import { injectable } from "tsyringe";
import { Http } from "../../../common/utils";
import { DeleteCategoryService, GetCategoryService } from "../services/admin";
import { NextFunction, Response, Request } from "express";
import { DeleteCategorySchema, GetCategorySchema, UpdateCategorySchema } from "../validation";
import UpdateCategoryService from "../services/admin/updatecategory.service";
import { CategoryTypes } from "../../../common/constants";
import { AddAccountSchema } from "../validation/account.validation";
import AddAccountService from "../services/admin/addaccount.service";

@injectable()
export default class AccountController {
    constructor(
        private http: Http,
        private addAccountService: AddAccountService,
        private deleteCategoryService: DeleteCategoryService,
        private updateCategoryService: UpdateCategoryService,
        private getCategoryService: GetCategoryService
    ){

    }

    async addAccount(req: Request, res: Response, next: NextFunction) {
        try {
            AddAccountSchema.parse(req.body);

            const response = await this.addAccountService.execute({...req.body});

            this.http.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully added account",
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