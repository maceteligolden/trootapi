import { injectable } from "tsyringe";
import { createData, readData, updateData } from "../../utils";
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

    async updateTransactionByRef(ref: string, payload: any): Promise<Transaction> {
        return await updateData(transactionSchema, {reference_no: ref}, payload);
    }
}