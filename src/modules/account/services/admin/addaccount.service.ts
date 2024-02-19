import { injectable } from "tsyringe";
import { User } from "../../../../common/database/models";
import { UserRepository } from "../../../../common/database/repositories";
import { BadRequestError } from "../../../../common/errors";

@injectable()
export default class AddAccountService {
    constructor(
        private userRepository: UserRepository
    ){

    }

    async execute(args: User): Promise<User> {

        const accountExist = await this.userRepository.findUserByEmail(args.email!);
        
        if(accountExist){
            throw new BadRequestError("email already exists")
        }

        return await this.userRepository.addUser(args);
    }
}