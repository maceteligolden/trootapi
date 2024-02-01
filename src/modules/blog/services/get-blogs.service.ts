import { injectable } from "tsyringe";
import { BlogRepository } from "../../../common/database/repositories";
import { Blog } from "../../../common/database/models";

@injectable()
export default class GetBlogsService {
    constructor(
        private blogRepository: BlogRepository
    ){

    }

    async execute(): Promise<Blog[]> {
        return await this.blogRepository.getBlogs();
    }
}