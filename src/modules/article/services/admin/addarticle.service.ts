import { injectable } from "tsyringe";
import { IAddArticleInput } from "../../interface";
import { ArticleRepository } from "../../../../common/database/repositories";
import { PaymentModel } from "../../../../common/constants";

@injectable() 
export default class AddArticleService {
    constructor(
        private articleRepository: ArticleRepository
    ) {

    }

    async execute(args: IAddArticleInput): Promise<void> {
      
        const {files, title, tags, description, category, uploader, payment_model, amount} = args;

        await this.articleRepository.add({
            title,
            description,
            category,
            uploader,
            payment_model: payment_model as PaymentModel,
            key: files.article[0].key,
            amount: amount ? amount : "0",
            thumbnail: files.thumbnail[0].key,
            tags: JSON.parse(tags)
        });
        
    }
}