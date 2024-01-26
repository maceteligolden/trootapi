import { injectable } from "tsyringe";
import { CategoryTypes } from "../../../../common/constants";
import { CategoryRepository } from "../../../../common/database/repositories";
import { Category } from "../../../../common/database/models";

@injectable()
export default class GetCategoryService {
    constructor(
        private categoryRepository: CategoryRepository
    ){

    }

    async execute(type: CategoryTypes): Promise<Category[]> {
        return await this.categoryRepository.getCategorys({ type });
    }
}