import { injectable } from "tsyringe";
import { Article } from "../models";
import { articleSchema } from "../schemas";
import { createData, deleteData, readData, readsingleData, updateData } from "../../utils";

@injectable()
export default class ArticleRepository {
    constructor(){

    }

    async add(payload: Article): Promise<Article> {
        return await createData(articleSchema, payload);
    }

    async update(keyword: string, payload: Partial<Article>): Promise<Article> {
        return await updateData(articleSchema, {_id: keyword}, payload);
    }

    async delete(id: string): Promise<void> {
        return await deleteData(articleSchema, id);
    }

    async getAll(): Promise<Article[]>{
        return await readData(articleSchema, {}).populate(["category"])
    }

    async getAllByCategory(category: string): Promise<Article[]>{
        return await readData(articleSchema, {category}).populate(["category"])
    }

    async getOneById(id: string): Promise<Article> {
        return await readsingleData(articleSchema, {_id: id});
    }
}