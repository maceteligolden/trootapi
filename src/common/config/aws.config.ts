import AWS from "aws-sdk";
import { injectable } from "tsyringe";
import { env } from "./env.config";

@injectable()
export default class AWSConfig {
    constructor(){

    }

    init() {
        AWS.config.credentials = new AWS.Credentials({
            accessKeyId: `${env.AWS.ACCESSKEYID}`, 
            secretAccessKey: `${env.AWS.SECRETACCESSKEY}`
        });
    }
}