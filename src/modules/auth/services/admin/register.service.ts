import { injectable } from "tsyringe";
import { hash } from "../../../../common/utils";
import BadRequestError from "../../../../common/errors/bad_request.error";
import { UserRepository } from "../../../../common/database/repositories";
import LoggerService from "../../../../common/services/logger.service";
import { User } from "../../../../common/database/models";
import { ICustomerRegisterInput } from "../../interfaces";
import { roles } from "../../../../common/constants";

@injectable()
export default class RegisterService{
    constructor(
      private userRepository: UserRepository,
      private loggerService: LoggerService
    ){

    }

    async execute(args: ICustomerRegisterInput): Promise<User>{
        const { email, password, firstname, lastname } = args;
        
        // check if user email exists
        const user = await this.userRepository.getUser({ email });
    
        if (user) {
            throw new BadRequestError("email already exists");
        }
    
        //encrypt password
        const encryptpassword = await hash(password);
    
        //register user
        const userdata = {
            firstname: firstname.toLowerCase(),
            lastname: lastname.toLowerCase(),
            password: encryptpassword,
            email: email.toLowerCase(),
            role: roles.ADMIN
        };
    
        const createUserAccount = await this.userRepository.addUser(userdata);

        this.loggerService.info(`${email} registered an admin account`);

        return createUserAccount;
    }
}