import { CategoryTypes } from "../../../common/constants";
const { z } = require("zod");

export const AddCategorySchema = z.object({
    name: z.string({ required_error: "name is required"}),
    description: z.string(),
    type: z.enum([ CategoryTypes.ARTICLE, CategoryTypes.BLOG ]),
});

export const DeleteCategorySchema = z.object({
    id: z.string({ required_error: "id is required"})
});

export const UpdateCategorySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional()
});

export const GetCategorySchema = z.object({
    type: z.enum([ CategoryTypes.ARTICLE, CategoryTypes.BLOG ]),
});