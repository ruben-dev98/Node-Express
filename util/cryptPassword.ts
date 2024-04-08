import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = (password: string) => {
    let passwordHash = bcrypt.hashSync(password, saltRounds);
    return passwordHash;
};

export const comparePassword = async (userPassword: string, password: string) => {
    return bcrypt.compareSync(password, userPassword);
}