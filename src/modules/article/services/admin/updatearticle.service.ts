import { injectable } from "tsyringe";
import { ArticleRepository } from "../../../../common/database/repositories";
import { IAddArticleInput } from "../../interface";

@injectable()
export default class UpdateArticleService {
    constructor(
        private articleRepository: ArticleRepository
    ){

    }

    async execute(id: string, payload: Partial<IAddArticleInput>): Promise<void>{
        const { files, title, description, category, uploader } = payload;
          
        ( files as unknown as Array<{ [fieldname: string]: File[]; } | File[] | undefined > ).map(async (file: any)=>{
            await this.articleRepository.update(id, {
                title,
                description,
                category,
                uploader,
                key: file.key
            })
        });
    }
}