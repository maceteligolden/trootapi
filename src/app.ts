import "reflect-metadata";
import 'dotenv/config';
import express, { Request, Response, NextFunction, Application } from "express";
import moduleRouters from "./common/router";
import { errorMiddleware } from "./common/middlewares";
import { TransactionRepository } from "./common/database/repositories";
import { container } from "tsyringe";
import { TransactionStatus } from "./common/constants/transaction.constant";
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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

    const endpointSecret = `whsec_Jx8DMoPVuWXGKYU5IwUYAtEDbyLkzjys`;

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

    switch (event.type) {
        case "checkout.session.completed":
            const payload = event.data.object;
            await transactionRepository.updateTransactionByRef(payload.metadata.reference, {
                status: TransactionStatus.SUCCESSFUL
            });

            //TODO: send email to download file
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