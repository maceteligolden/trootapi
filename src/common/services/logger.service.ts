import { injectable } from "tsyringe";
import { CloudWatchLogsClient, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
import AWS from "aws-sdk";
import { env } from "../config/env.config";

export const cloudWatchLogsClient = new CloudWatchLogsClient({
    region: "us-east-1", // Replace with your AWS region
    credentials: {
        accessKeyId: `${env.AWS.ACCESSKEYID}`, // Replace with your AWS Access Key ID
        secretAccessKey: `${env.AWS.SECRETACCESSKEY}`, // Replace with your AWS Secret Access Key
    },
});

@injectable()
export default class LoggerService {

    constructor(){
     
    }

    async info(message: string, metadata?: {}) {
        try {
            const NODE_ENV = process.env.NODE_ENV;
       
            if(NODE_ENV !== "test"){
                console.log(message)
            } else {
                console.log(message);
            }
        } catch (error) {
            console.error("Error describing log streams:", error);
        }
    }

    async error(message: string) {
        console.error(message)
    }
}