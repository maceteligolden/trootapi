import { injectable } from "tsyringe";
import { ArticleRepository } from "../../../../common/database/repositories";

@injectable()
export default class DeleteArticleService {
    constructor(
        private articleRepository: ArticleRepository
    ){

    }

    async execute(id: string): Promise<void>{
        return await this.articleRepository.delete(id)
    }
}