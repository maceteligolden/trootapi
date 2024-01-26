import { v4 as uuidv4 } from "uuid";
import { generateReference } from "./reference-generator.util";

jest.mock("uuid", () => ({
    v4: jest.fn(()=> "somereference")
}));

test("generate reference", () => {
    const generate_reference = generateReference("REP");
    
    expect(generate_reference).toBe("REP-somereference");
});