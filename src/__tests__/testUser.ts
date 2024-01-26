import { container } from "tsyringe";
import { LoginService, RegisterService } from "../modules/auth/services/admin";
import { ICustomerRegisterInput } from "../modules/auth/interfaces";
import { User } from "../common/database/models";


export const registerTestUser = async (): Promise<User> => {
    const registerService = container.resolve(RegisterService);
    const user:  ICustomerRegisterInput = {
        firstname: "golden",
        lastname: "maceteli",
        password: "password",
        email: "golden@test.com"
    };

    return await registerService.execute(user);
};

export const testAuthToken = async () => {
  
    const loginService = container.resolve(LoginService);

    const registeredUser = await registerTestUser();

    const response =  await loginService.execute({
        email: registeredUser.email ? registeredUser.email : "",
        password: "password"
    });

    return response.token;
};