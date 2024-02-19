import { injectable } from "tsyringe";
import { CategoryRepository } from "../../../../common/database/repositories";

@injectable()
export default class DeleteCategoryService {
    constructor(
        private categoryRepository: CategoryRepository
    ){

    }

    async execute(id: string): Promise<void> {
        return await this.categoryRepository.deleteCategory(id);
    }
}