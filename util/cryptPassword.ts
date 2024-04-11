import bcrypt from 'bcryptjs';
const saltRounds = 10;

export const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, saltRounds);
};

export const comparePassword = (userPassword: string | undefined, password: string): boolean => {
    if(userPassword) {
        return bcrypt.compareSync(password, userPassword);
    }
    return false;
}