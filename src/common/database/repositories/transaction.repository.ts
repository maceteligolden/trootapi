import { injectable } from "tsyringe";
import { createData, readData } from "../../utils";
import { transactionSchema } from "../schemas";
import { Transaction } from "../models";

@injectable()
export default class TransactionRepository {
    constructor(){}

    async createTransaction(payload: Transaction): Promise<Transaction>{
        return await createData(transactionSchema, payload);
    }
    
    async getTransactions(): Promise<Transaction[]> {
        return await readData(transactionSchema, {});
    }
}