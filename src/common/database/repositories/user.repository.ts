import { injectable } from "tsyringe";
import { UserSchema } from "../schemas";
import { createData, deleteData, readData, readsingleData, updateData } from "../../utils";
import { User } from "../models";

@injectable()
export default class UserRepository {

    constructor(){
    }

    async addUser(payload: User): Promise<User> {
        const User = await createData(UserSchema, payload);
        return User;
    }

    async findUserByEmail(email: string): Promise<User> {
        return await readsingleData(UserSchema, { email });
    }

    async getUsers(payload: Partial<User>): Promise<User[]>{
        const Users = await readData(UserSchema, payload);
        return Users;
    }

    async getUser(payload: Partial<User>): Promise<User> {
        const User = await readsingleData(UserSchema, payload);
        return User;
    }

    async updateUser(keyword: Record<string, any>, data: Partial<User>): Promise<User>{
        const User = await updateData(UserSchema, keyword, data);
        return User;
    }

    async deleteUser(id: string){
        const User = await deleteData(UserSchema, {_id: id});
        return User;
    }

}