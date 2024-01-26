import jwt from "jsonwebtoken";
import { generateToken, verifyToken } from "./token";

test("successfully generate token", () => {
    jest.spyOn(jwt, "sign").mockImplementation(()=> {
        return "somerandomtoken";
    });

    const generate_token = generateToken({}, "somesecret");

    expect(generate_token).toBe("somerandomtoken");
});

test("successfully verify token", () => {
    jest.spyOn(jwt, "verify").mockImplementation(()=> {
        return true;
    });

    const verify_token = verifyToken({}, "somesecret");

    expect(verify_token).toBe(true);
});