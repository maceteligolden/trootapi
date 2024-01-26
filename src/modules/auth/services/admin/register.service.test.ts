import request from "supertest";
import express from "express";
import { authRouter } from "../../routes";
import { ICustomerRegisterInput } from "../../interfaces";

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);

test("successfully register a customer", async () => {

    const user:  ICustomerRegisterInput = {
        firstname: "golden",
        lastname: "maceteli",
        password: "password",
        email: "gol@test.com"
    };

    const response = await request(app)
        .post("/api/v1/auth/register")
        .send(user);

    expect(response.status).toBe(200);
    expect(response.body.data.email).toEqual(user.email);
});