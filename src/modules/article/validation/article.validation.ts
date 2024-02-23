const { z } = require("zod");

export const addArticleSchema = z.object({
    title: z.string({ required_error: "Title is required"}),
    description: z.string({ required_error: "Description is required"}),
    category: z.string({ required_error: "Category is required"}),
    payment_model: z.string({ required_error: "Payment Model is required"}),
});

export const deleteArticleSchema = z.object({
    id: z.string({ required_error: "article id is required"}),
});

export const getArticleSchema = z.object({
    id: z.string({ required_error: "article id is required"}),
});