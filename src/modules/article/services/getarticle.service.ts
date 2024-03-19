import { injectable } from "tsyringe";
import { Article } from "../../../../common/database/models";
import { ArticleRepository } from "../../../../common/database/repositories";

@injectable()
export default class GetArticleService {
    constructor(
        private articleRepository: ArticleRepository
    ){

    }

    async execute(id: string): Promise<Article>{
        return await this.articleRepository.getOneById(id);
    }
}