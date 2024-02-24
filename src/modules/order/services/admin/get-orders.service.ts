import { injectable } from "tsyringe";
import { TransactionRepository } from "../../../../common/database/repositories";

@injectable() 
export default class GetOrdersService {
    constructor(
        private transactionRepository: TransactionRepository
    ){

    }

    async execute(){
        return await this.transactionRepository.getTransactions();
    }
}