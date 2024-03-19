import { injectable } from "tsyringe";
import { Article } from "../../../../common/database/models";
import { ArticleRepository } from "../../../../common/database/repositories";

@injectable()
export default class GetArticleService {
    constructor(
        private articleRepository: ArticleRepository
    ){

    }

    async execute(id: string): Promise<{article: Article, related_articles: Article[]}>{
        const article = await this.articleRepository.getOneById(id);

        const related_articles = await this.articleRepository.getAllByCategory(article.category!)

        return {
            article,
            related_articles
        }
    }
}