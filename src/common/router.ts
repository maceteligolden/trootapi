import { Application } from "express";
import { Router } from "express";
import { authRouter } from "../modules/auth/routes";
import { categoryRouter } from "../modules/category/routes";
import { articleRouter } from "../modules/article/routes";

export const router = Router({});
router.get("/", async (_req, res, _next) => {

    const healthcheck = {
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
        res.status(200);
    } catch (error: any) {
        res.send(error.message);
        res.status(503).send();
    }
});


export const BASE_URL = "/api/v1";
export const ADMIN_BASE_URL = `${BASE_URL}/admin`;
export const AGENT_BASE_URL = `${BASE_URL}/agent`;

export default function moduleRouters(app: Application): void {
    app.use("/health_check", router);

    /** CUSTOMER ROUTES */
    app.use(`${BASE_URL}/auth`, authRouter);
    app.use(`${BASE_URL}/category`, categoryRouter);
    app.use(`${BASE_URL}/article`, articleRouter);
}
