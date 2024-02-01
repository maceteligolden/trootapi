import { injectable } from "tsyringe";
import { Blog } from "../../../../common/database/models";
import { BlogRepository } from "../../../../common/database/repositories";

@injectable()
export default class UpdateBlogService {
    constructor(
        private blogRepository: BlogRepository
    ){

    }

    async execute(id: string, payload: Partial<Blog>): Promise<Blog> {
        return await this.blogRepository.updateBlogById(id, payload);
    }
}