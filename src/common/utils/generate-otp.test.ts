import { generateOtp } from "./generateOtp.util";


test("successfully generate otp", () => {
    jest.spyOn(Math, "floor").mockImplementation(()=> {
        return 1234;
    });

    const generate_otp = generateOtp();

    expect(generate_otp).toBe(1234);
});