export const generatePassword = (passwordLength: number): string => {
    return Math.random().toString(36).slice(-passwordLength);
};