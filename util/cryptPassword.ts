import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, saltRounds);
};

export const comparePassword = async (userPassword: string, password: string) => {
    return bcrypt.compareSync(password, userPassword);
}