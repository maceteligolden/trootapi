import request from "supertest";
import express from "express";
import { registerTestUser } from "../../../../__tests__/testUser";
import { authRouter } from "../../routes";
import { ICustomerLoginOutput } from "../../interfaces";
import { roles } from "../../../../common/constants";

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);

test("successfully login", async () => {

    await registerTestUser();

    const response = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: "golden@test.com", password: "password" });

    const result: ICustomerLoginOutput = {
        token: "",
        user: {
            firstname: "",
            id: "",
            email: "golden@test.com",
            role: roles.ADMIN
        }
    }

    expect(response.status).toBe(200);
    expect(response.body.data.user.email).toEqual(result.user.email);

});