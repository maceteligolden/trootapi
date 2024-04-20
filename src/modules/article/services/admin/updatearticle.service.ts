import { injectable } from "tsyringe";
import { ArticleRepository } from "../../../../common/database/repositories";
import { IAddArticleInput } from "../../interface";

@injectable()
export default class UpdateArticleService {
    constructor(
        private articleRepository: ArticleRepository
    ){

    }

    async execute(articleId: string, payload: Partial<IAddArticleInput>): Promise<void>{
        const { files, title, description, category, amount } = payload;
          
            await this.articleRepository.update(articleId, {
                title,
                description,
                category,
                key: files.article[0].key,
                amount: amount ? amount : "0",
                thumbnail: files.thumbnail[0].key
            });
    }
}