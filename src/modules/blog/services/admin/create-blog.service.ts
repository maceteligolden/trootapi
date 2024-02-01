import { injectable } from "tsyringe";
import { BlogRepository } from "../../../../common/database/repositories";
import { Blog } from "../../../../common/database/models";

@injectable()
export default class CreateBlogService {
    constructor(
        private blogRepository: BlogRepository
    ){

    }

    async execute(args: Blog){
        return await this.blogRepository.createBlog(args);
    }
}