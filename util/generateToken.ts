import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './getSecretKey';
import { hashPassword } from './cryptPassword';

export const generateAccessToken = (email: string, password: string) => {
    const passwordHash = hashPassword(password);
    return jwt.sign({email, password: passwordHash}, SECRET_KEY, { expiresIn: '10y' });
}
