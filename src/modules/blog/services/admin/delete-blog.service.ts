import { injectable } from "tsyringe";
import { BlogRepository } from "../../../../common/database/repositories";

@injectable()
export default class DeleteBlogService {
    constructor(
        private blogRepository: BlogRepository
    ){

    }

    async execute(id: string){
        return await this.blogRepository.deleteBlog(id);
    }
}