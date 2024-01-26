import { injectable } from "tsyringe";
import { Category } from "../../../../common/database/models";
import { CategoryRepository } from "../../../../common/database/repositories";
import { BadRequestError } from "../../../../common/errors";

@injectable()
export default class AddCategoryService {
    constructor(
        private categoryRepository: CategoryRepository
    ){

    }

    async execute(args: Category): Promise<Category> {

        const category = await this.categoryRepository.findCategoryByName(args.name ? args.name : "");

        if(category.length > 0){
            throw new BadRequestError("category name already exists")
        }

        return await this.categoryRepository.addCategory(args);
    }
}