import { injectable } from "tsyringe";
import { compareHash, generateToken } from "../../../../common/utils";
import BadRequestError from "../../../../common/errors/bad_request.error";
import { UserRepository } from "../../../../common/database/repositories";
import LoggerService from "../../../../common/services/logger.service";
import { roles } from "../../../../common/constants";
import { ICustomerLoginInput, ICustomerLoginOutput } from "../../interfaces";

@injectable()
export default class LoginService {
    constructor(
        private userRepository: UserRepository,
        private loggerService: LoggerService
    ){}

    async execute(args: ICustomerLoginInput): Promise<ICustomerLoginOutput> {
        const { email, password } = args;
          
        // Check if user exists
        const user = await this.userRepository.getUser({ email: email.toLowerCase() });

        if (!user) {
            throw new BadRequestError("email/password is invalid");
        }

        // check user role
        if(user.role !== roles.ADMIN) {
            throw new BadRequestError("email/password is invalid");
        }
            
        // check password 
        const checkpassword = await compareHash(password, user.password!);
        
        if(!checkpassword){
            throw new BadRequestError("email/password is invalid");
        }

        const userdetails = {
            firstname: user.firstname,
            id: user._id,
            email: user.email
        };

        const generatedToken = await generateToken(userdetails, `${process.env.JWT_SECRET}`);
            
        const responseData = {
            token: generatedToken,
            user: {
                firstname: user.firstname ? user.firstname : "",
                id: user._id ? user._id : "",
                email: user.email ? user.email : "",
                role: user.role ? user.role : ""
            }
        };

        this.loggerService.info(`${user.email} logged in an admin account`);

        return responseData;
    }
}