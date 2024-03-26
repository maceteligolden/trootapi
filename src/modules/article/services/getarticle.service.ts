import { injectable } from "tsyringe";
import { ArticleRepository } from "../../../common/database/repositories";
import { Article } from "../../../common/database/models/article.model";

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