import { injectable } from "tsyringe";
import { categorySchema } from "../schemas";
import { createData, deleteData, readData, readsingleData, updateData } from "../../utils";
import { Category } from "../models";

@injectable()
export default class CategoryRepository {

    constructor(){
    }

    async addCategory(payload: Category): Promise<Category> {
        const Category = await createData(categorySchema, payload);
        return Category;
    }

    async findCategoryByName(name: string): Promise<Category[]> {
        return await readData(categorySchema, { name })
    }

    async getCategorys(payload: Partial<Category>): Promise<Category[]>{
        const Categorys = await readData(categorySchema, payload);
        return Categorys;
    }

    async getUser(payload: Partial<Category>): Promise<Category> {
        const Category = await readsingleData(categorySchema, payload);
        return Category;
    }

    async updateCategory(keyword: Record<string, any>, data: Partial<Category>): Promise<Category>{
        const Category = await updateData(categorySchema, keyword, data);
        return Category;
    }

    async deleteCategory(id: string){
        const Category = await deleteData(categorySchema, {_id: id});
        return Category;
    }

}