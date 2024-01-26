import { injectable } from "tsyringe";
import { IAddArticleInput } from "../../interface";
import { ArticleRepository } from "../../../../common/database/repositories";
import { Article } from "../../../../common/database/models";

@injectable() 
export default class AddArticleService {
    constructor(
        private articleRepository: ArticleRepository
    ) {

    }

    async execute(args: IAddArticleInput): Promise<void> {
      
            const { files, title, description, category, uploader } = args;
          
            ( files as unknown as Array<{ [fieldname: string]: File[]; } | File[] | undefined > ).map(async (file: any)=>{
                await this.articleRepository.add({
                    title,
                    description,
                    category,
                    uploader,
                    key: file.key
                })
            });
        
    }
}