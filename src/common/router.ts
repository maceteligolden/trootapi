import { Application } from "express";
import { Router } from "express";
import { authRouter } from "../modules/auth/routes";
import { categoryRouter } from "../modules/category/routes";
import { articleRouter } from "../modules/article/routes";
import adminBlogRouter from "../modules/blog/routes/admin-blog.route";
import customerBlogRouter from "../modules/blog/routes/customer-blog.route";

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

    /** ADMIN ROUTES */
    app.use(`${ADMIN_BASE_URL}/auth`, authRouter);
    app.use(`${ADMIN_BASE_URL}/category`, categoryRouter);
    app.use(`${ADMIN_BASE_URL}/article`, articleRouter);
    app.use(`${ADMIN_BASE_URL}/blogs`, adminBlogRouter);

    /** CUSTOMER ROUTES */
    app.use(`${BASE_URL}/blogs`, customerBlogRouter);
}
