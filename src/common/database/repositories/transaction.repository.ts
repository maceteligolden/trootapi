import { injectable } from "tsyringe";
import { createData } from "../../utils";
import { transactionSchema } from "../schemas";
import { Transaction } from "../models";

@injectable()
export default class TransactionRepository {
    constructor(){}

    async createTransaction(payload: Transaction): Promise<Transaction>{
        return await createData(transactionSchema, payload);
    }
}