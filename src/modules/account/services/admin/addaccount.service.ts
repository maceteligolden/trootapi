import { injectable } from "tsyringe";
import { User } from "../../../../common/database/models";
import { UserRepository } from "../../../../common/database/repositories";
import { BadRequestError } from "../../../../common/errors";
import { roles } from "../../../../common/constants";
import { hash } from "../../../../common/utils";

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

        const encryptedPassword = await hash(args.password ? args.password : "");

        //TODO: send email to user with details

        return await this.userRepository.addUser({
            ...args,
            role: roles.ADMIN,
            password: encryptedPassword
        });
    }
}