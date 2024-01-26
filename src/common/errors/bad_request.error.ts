import { container } from "tsyringe";
import { CustomError } from "./custom.error";
import LoggerService from "../services/logger.service";

export default class BadRequestError extends CustomError {
    statusCode = 400;
    metadata;
    constructor(message: string, metadata?: {}) {
        super(message);
        this.metadata = metadata;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        const logger = container.resolve(LoggerService);
        logger.info(`${this.message}`, this.metadata);
        return [{ message: this.message }];
    }
}
