import bcrypt from "bcryptjs";
import { compareHash, hash } from "./encrypt";

test("hash a string", async () => {
    jest.spyOn(bcrypt, "genSalt").mockImplementation(()=>{
        return 123;
    });

    jest.spyOn(bcrypt, "hash").mockImplementation(()=>{
        return "123456789";
    });

    const hashString = await hash("password");

    expect(hashString).toBe("123456789");
});

test("compare hash", async () => {
    jest.spyOn(bcrypt, "compare").mockImplementation(()=>{
        return true;
    });

    const comparedHashResult = await compareHash("password","databasepassword");

    expect(comparedHashResult).toBe(true);
});