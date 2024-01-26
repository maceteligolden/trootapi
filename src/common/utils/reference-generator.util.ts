import { v4 as uuidv4 } from "uuid";

export const generateReference = (prefix: string): string => {
    const random_string = uuidv4();
    return `${prefix}-${random_string}`;
};