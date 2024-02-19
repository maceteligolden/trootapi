import { injectable } from "tsyringe";
import { UserRepository } from "../../../../common/database/repositories";
import { User } from "../../../../common/database/models";

@injectable()
export default class UpdateAccountService {
    constructor(
        private userRepository: UserRepository
    ){

    }

    async execute(id: string, body: Partial<User>): Promise<User> {
        return await this.userRepository.updateUser({_id: id}, body)
    }
}