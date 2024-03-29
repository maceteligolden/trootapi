import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom.error";
import LoggerService from "../services/logger.service";
import { container } from "tsyringe";
import { Http } from "../utils";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const logger = container.resolve(LoggerService);
    const http = container.resolve(Http);

    logger.info(`${err.message}`);
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }
    
    res.status(500).send({
        errors: [{ message: err.message }]
    });
};