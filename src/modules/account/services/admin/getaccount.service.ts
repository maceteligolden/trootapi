import { injectable } from "tsyringe";
import { UserRepository } from "../../../../common/database/repositories";
import { User } from "../../../../common/database/models";

@injectable()
export default class GetAccountService {
    constructor(
        private userRepository: UserRepository
    ){

    }

    async execute(id: string): Promise<User> {
        return await this.userRepository.getUser({_id: id});
    }
}