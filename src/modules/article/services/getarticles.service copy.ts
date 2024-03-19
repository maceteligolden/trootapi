import { injectable } from "tsyringe";
import { Article } from "../../../../common/database/models";
import { ArticleRepository } from "../../../../common/database/repositories";

@injectable()
export default class GetArticlesService {
    constructor(
        private articleRepository: ArticleRepository
    ){

    }

    async execute(): Promise<Article[]>{
        return await this.articleRepository.getAll();
    }
}