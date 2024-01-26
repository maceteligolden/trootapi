
import { Response } from "express";
import { injectable } from "tsyringe";

@injectable()
export default class Http {

    constructor(){
    }

    Response({res, statuscode, status, message, data, error}: ResponseModel) {

        const response: Response =  res.status(statuscode ? statuscode : 200).json({
            status: status,
            message: message,
            error,
            data: data
        });
        return response;
    }
}

export interface ResponseModel {
    res: Response,
    statuscode?: number,
    status?: "error" | "success",
    message?: string | string[],
    error?: {message: string, field?: string}[],
    data?: any
}