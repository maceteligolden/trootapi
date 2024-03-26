import "reflect-metadata";
import 'dotenv/config';
import express, { Request, Response, NextFunction, Application } from "express";
import moduleRouters from "./common/router";
import { errorMiddleware } from "./common/middlewares";
import { TransactionRepository } from "./common/database/repositories";
import { container } from "tsyringe";
import { TransactionStatus } from "./common/constants/transaction.constant";
import EmailService, { FileDetail } from "./common/services/email.service";
import { Article } from "./common/database/models";
const stripe = require('stripe')(`${process.env.STRIPE_API_KEY}`);

const app: Application = express();

app.use((req: Request , res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.setHeader("stripe-signature", "*");
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));
moduleRouters(app);
app.use(errorMiddleware);
app.post("/webhook", express.raw({type: "application/json"}), 
async (request, response) => {

    const endpointSecret = `${process.env.STRIPE_WEBHOOK_SECRET}`;

    const sig = request.headers["stripe-signature"];

    let event;

    const rawBody = request.body.toString("utf8");

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return; 
    }

    const transactionRepository = container.resolve(TransactionRepository);
    const emailService = container.resolve(EmailService);

    switch (event.type) {
        case "checkout.session.completed":
            const payload = event.data.object;
            const transaction = await transactionRepository.updateTransactionByRef(payload.metadata.reference, {
                status: TransactionStatus.SUCCESSFUL
            });

            let files: FileDetail[] = [];

            transaction.articles?.map((article: Article)=> {
                files.push({
                    name: article.title!,
                    key: article.key!
                })
            });

            await emailService.sendEmail(
                {
                    name: transaction.customer_firstname!,
                    email: transaction.customer_email!
                },  files);
        break;
            
        case "checkout.session.expired":
            const payloadFailed = event.data.object;
            await transactionRepository.updateTransactionByRef(payloadFailed.metadata.reference, {
                status: TransactionStatus.EXPIRED
            });
        break;

    default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

export default app;