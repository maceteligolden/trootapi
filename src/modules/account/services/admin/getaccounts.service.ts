import { injectable } from "tsyringe";
import { UserRepository } from "../../../../common/database/repositories";
import { User } from "../../../../common/database/models";

@injectable()
export default class GetAccountsService {
    constructor(
        private userRepository: UserRepository
    ){

    }

    async execute(): Promise<User[]> {
        return await this.userRepository.getUsers({});
    }
}