import jwt from "jsonwebtoken";

const generateToken = (payload: any, secret: string) => {
    const token = jwt.sign(payload, secret);
    return token;
};

const verifyToken = (payload: any, secret: string) => {
    return jwt.verify(payload, secret);

};

export {
    generateToken,
    verifyToken,
};