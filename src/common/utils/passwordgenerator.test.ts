import { generatePassword } from "./passwordgenerator";

test("successfully generate password", () => {
    jest.spyOn(Math, "random").mockImplementation(()=>{
        return 1234567891011;
    });

    const generate_password = generatePassword(5);

    expect(generate_password).toBe("huhc3");
});