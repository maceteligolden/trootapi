import { injectable } from "tsyringe";
import { Blog } from "../../../common/database/models";
import { BlogRepository } from "../../../common/database/repositories";

@injectable()
export default class GetBlogService {
    constructor(
        private blogRepository: BlogRepository
    ){}

    async execute(id: string): Promise<Blog> {
        return await this.blogRepository.getBlogById(id);
    }
}