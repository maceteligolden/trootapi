import { injectable } from "tsyringe";
import sendgrid from "@sendgrid/mail";

export interface FileDetail {
    name: string;
    key: string;
}

export interface ReceiverDetail {
    name: string;
    email: string
}

@injectable()
export default class EmailService {
    constructor(){

    }

    async sendEmail(receiver: ReceiverDetail, files: FileDetail[]) {
        const fileList = files.map((file: FileDetail)=> {
            return `<li><a href="${process.env.AWS_STORAGE_BASE_URL}/${file.key}" target="_blank"> ${file.name}</a></li>`
        });

        const API_KEY = process.env.SENDGRID_API_KEY || "";
        sendgrid.setApiKey(API_KEY);

        const message = {
            from: {
                email: `${process.env.SENDGRID_EMAIL}`,
                name: 'Trootfindr'
            },
            to: {
                email: receiver.email,
                name: receiver.name
            },
            subject: 'Successfully purchased an article',
            html: `<div><h1>Congratulations on your purchase</h1> <br/> <h4>Files</h4> <br/> <ul>${fileList}</ul></div>`
        };
          
        sendgrid
        .send([message])
        .then(() => console.log('Mail sent successfully'))
        .catch(error => {
            console.error(error);
        });
    }
}