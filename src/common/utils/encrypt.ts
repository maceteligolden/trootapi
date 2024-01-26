import bcrypt from "bcryptjs";

const hash = async (password: string) => {

    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(
        password, 
        salt
    );
};

const compareHash = async (password: string, dbpassword: string) => {

    if(await bcrypt.compare(password, dbpassword)){
        return true;
    }
  
    return false;

};

export {
    hash,
    compareHash
};