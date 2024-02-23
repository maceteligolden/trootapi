import { env } from "../config/env.config";

const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_KEY || "",
    Bucket: `${process.env.AWS_STORAGE}`,
    region: `${process.env.AWS_STORAGE_REGION}`
});

const local_storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, "uploads");
    },
    filename: function (req: any, file: any, cb: any) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    }
});

const s3_storage = multerS3({
    s3: s3,
    bucket:`${process.env.AWS_STORAGE}`,
    metadata: function (req: any, file: any, cb: any) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req: any, file: any, cb: any) {
        cb(null, Date.now().toString());
    }
});

export const fileMiddleware = multer({
    storage: s3_storage
});