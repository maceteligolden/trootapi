import { injectable } from "tsyringe";
import { blogSchema } from "../schemas";
import { createData, deleteData, readData, readsingleData, updateData } from "../../utils";
import { Blog } from "../models";

@injectable()
export default class BlogRepository {
    constructor(){}

    async createBlog(payload: Blog): Promise<Blog>{
        return await createData(blogSchema, payload);
    }

    async deleteBlog(id: string){
        return await deleteData(blogSchema, { _id: id});
    }

    async getBlogById(id: string): Promise<Blog>{
        return await readsingleData(blogSchema, {_id: id})
    }

    async getBlogs(): Promise<Blog[]>{
        return await readData(blogSchema, {});
    }

    async updateBlogById(id: string, payload: any): Promise<Blog> {
        return await updateData(blogSchema, { _id: id}, payload);
    }
}