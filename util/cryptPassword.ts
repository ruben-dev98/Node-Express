import bcrypt from 'bcryptjs';
const saltRounds = 10;

export const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, saltRounds);
};

export const comparePassword = (userPassword: string, password: string): boolean => {
    return bcrypt.compareSync(password, userPassword);
}

export const isSaltExist = (hash: string) => {
    try {
        bcrypt.getSalt(hash);
        return true;
    } catch(error) {
        return false;
    }
}