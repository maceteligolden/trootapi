import { CategoryTypes } from "../../../common/constants";
const { z } = require("zod");

export const AddAccountSchema = z.object({
    firstname: z.string({ required_error: "firstname is required"}),
    lastname: z.string({ required_error: "lastname is required"}),
    email: z.string({ required_error: "email is required"}),
    password: z.string({ required_error: "password is required"}),
    type: z.enum([ CategoryTypes.ARTICLE, CategoryTypes.BLOG ]),
});

export const DeleteAccountSchema = z.object({
    id: z.string({ required_error: "id is required"})
});

export const UpdateCategorySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional()
});

export const GetCategorySchema = z.object({
    type: z.enum([ CategoryTypes.ARTICLE, CategoryTypes.BLOG ]),
});