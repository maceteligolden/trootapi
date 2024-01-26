import { NextFunction } from "express";
import { Request, Response } from "express";
import { verifyToken } from "../utils";
import BadRequestError from "../errors/bad_request.error";
import { env } from "../config/env.config";

const SECRET_KEY = `${env.JWT_SECRET}`|| "";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader: string | undefined = req.headers.authorization ;
      
        if(!authHeader || !authHeader.split(" ")[1]){
            throw new BadRequestError("user not authorized");
        }

        const accesstoken = authHeader && authHeader.split(" ")[1];
        const verify = await verifyToken(accesstoken, `${process.env.JWT_SECRET}`);
    
        if(!verify){
            throw new BadRequestError("user not authorized");
        } else {
            req.body.user = verify;
        }       

        next();
    }catch(err: any){
        next(err.message);
    }
}