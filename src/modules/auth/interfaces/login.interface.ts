export interface ICustomerLoginInput {
    email: string;
    password: string;
}

export interface ICustomerLoginOutput {
    token: string;
    user: {
        firstname: string;
        id: string;
        email: string;
        role: string;
    }
}