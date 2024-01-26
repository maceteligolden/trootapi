import { env } from "../config/env.config";

const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const s3 = new aws.S3({
    accessKeyId: process.env.ACCESSKEYID || "",
    secretAccessKey: process.env.SECRETACCESSKEY || "",
    Bucket: `${env.AWS.S3.ASSETS}`,
    region: "us-east-2"
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
    bucket:`${env.AWS.S3.ASSETS}`,
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