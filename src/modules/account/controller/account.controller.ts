import { injectable } from "tsyringe";
import { Http } from "../../../common/utils";
import { DeleteAccountService, GetAccountService, GetAccountsService } from "../services/admin";
import { NextFunction, Response, Request } from "express";
import { DeleteAccountSchema, UpdateCategorySchema } from "../validation";
import UpdateCategoryService from "../services/admin/updatecategory.service";
import { AddAccountSchema } from "../validation/account.validation";
import AddAccountService from "../services/admin/addaccount.service";

@injectable()
export default class AccountController {
    constructor(
        private http: Http,
        private addAccountService: AddAccountService,
        private deleteAccountService: DeleteAccountService,
        private updateCategoryService: UpdateCategoryService,
        private getAccountsService: GetAccountsService,
        private getAccountService: GetAccountService
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

    async deleteAccount(req: Request, res: Response, next: NextFunction) {
        try {
            DeleteAccountSchema.parse(req.params);

            const { id } = req.params;

            const response = await this.deleteAccountService.execute(id);

            this.http.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully deleted account",
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

    async getAccounts(req: Request, res: Response, next: NextFunction) {
        try {

            const response = await this.getAccountsService.execute();

            this.http.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully get all accounts",
                data: response
            });
        } catch (err: any){
            next(err)
        }
    }

    async getAccount(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            const response = await this.getAccountService.execute(id);

            this.http.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "successfully get account",
                data: response
            });
        } catch (err: any){
            next(err)
        }
    }
}