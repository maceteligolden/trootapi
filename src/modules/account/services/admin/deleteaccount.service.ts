import { injectable } from "tsyringe";
import { UserRepository } from "../../../../common/database/repositories";

@injectable()
export default class DeleteAccountService {
    constructor(
        private userRepository: UserRepository
    ){

    }

    async execute(id: string): Promise<void> {
        return await this.userRepository.deleteUser(id);
    }
}