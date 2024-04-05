import { injectable } from "tsyringe";
import { ArticleRepository, TransactionRepository } from "../../../common/database/repositories";
import { generateReference } from "../../../common/utils/reference-generator.util";
import { BadRequestError } from "../../../common/errors";
import { TransactionType } from "../../../common/constants/transaction.constant";

@injectable()
export default class FreedownloadService {
    constructor(
        private articleRepository: ArticleRepository,
        private transactionRepository: TransactionRepository
    ){

    }

    async execute(articleId: string) {
        const article = await this.articleRepository.getOneById(articleId);

        if(!article){
            throw new BadRequestError("article not found");
        }

        const generatedRef = generateReference("TRT"); 

        await this.transactionRepository.createTransaction({
            reference_no: generatedRef,
            amount: "0",
            articles: [article],
            transaction_type: TransactionType.FREEDOWNLOAD
        });

        //TODO: download logic goes here
    }
}