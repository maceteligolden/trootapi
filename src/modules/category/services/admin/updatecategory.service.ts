import { injectable } from "tsyringe";
import { CategoryRepository } from "../../../../common/database/repositories";
import { Category } from "../../../../common/database/models";

@injectable()
export default class UpdateCategoryService {
    constructor(
        private categoryRepository: CategoryRepository
    ){

    }

    async execute(id: string, body: Partial<Category>): Promise<Category> {
        return await this.categoryRepository.updateCategory({_id: id}, body)
    }
}