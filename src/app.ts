import "reflect-metadata";
import 'dotenv/config';
import express, { Request, Response, NextFunction, Application } from "express";
import moduleRouters from "./common/router";
import { errorMiddleware } from "./common/middlewares";
import session from 'express-session';
import cookieParser from 'cookie-parser';

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
// app.use(
//     session({
//       secret: `${process.env.JWT_SECRET}`,
//       resave: false,
//       saveUninitialized: true,
//       cookie: { secure: false },
//     })
// );
// app.use(cookieParser());


export default app;