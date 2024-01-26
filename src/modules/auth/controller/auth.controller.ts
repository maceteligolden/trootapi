import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { LoginService, RegisterService } from "../services/admin";
import { Http } from "../../../common/utils";
import { LoginSchema, RegisterSchema } from "../validation";

@injectable()
export default class AuthController {
    constructor(
        private httpService: Http,
        private loginService: LoginService,
        private registerService: RegisterService,
    ){}

    async login(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{

            LoginSchema.parse(req.body);

            const { email, password } = req.body;

            const response = await this.loginService.execute({
                email,
                password
            });

            this.httpService.Response({
                res,
                status: "success",
                message: "Account Authorized",
                data: response
            });
        }catch(err: any){
            next(err);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            RegisterSchema.parse(req.body);

            const { email, password, firstname, lastname } = req.body;

            const response = await this.registerService.execute({
                email,
                password,
                firstname,
                lastname
            });

            this.httpService.Response({
                res,
                status: "success",
                message: "Account successfully created",
                data: response
            });
        } catch(err: any){
            next(err);
        }
    }
}