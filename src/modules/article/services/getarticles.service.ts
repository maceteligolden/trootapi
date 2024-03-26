import { injectable } from "tsyringe";
import ArticleRepository from "../../../common/database/repositories/article.repository";
import { Article } from "../../../common/database/models/article.model";


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