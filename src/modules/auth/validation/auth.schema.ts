const { z } = require("zod");

export const LoginSchema = z.object({
    password: z.string({required_error: "Password is required"}).min(7, "Password is char must be minimum 7 length"),
    email: z.string({required_error: "Email is required"}).email("Invalid email format")
});

export const RegisterSchema = z.object({
    password: z.string({ required_error: "Password is required"}).min(7, "Password is char must be minimum 7 length"),
    email: z.string({ required_error: "Email is required"}).email("Invalid email format"),
    firstname: z.string({ required_error: "FirstName is required"}),
    lastname: z.string({ required_error: "LastName is required"}),
});