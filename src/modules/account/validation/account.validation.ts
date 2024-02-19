import { CategoryTypes } from "../../../common/constants";
const { z } = require("zod");

export const AddAccountSchema = z.object({
    firstname: z.string({ required_error: "firstname is required"}),
    lastname: z.string({ required_error: "lastname is required"}),
    email: z.string({ required_error: "email is required"}),
    password: z.string({ required_error: "password is required"})
});

export const DeleteAccountSchema = z.object({
    id: z.string({ required_error: "id is required"})
});
