import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './getSecretKey';
import { hashPassword } from './cryptPassword';

export const generateAccessToken = (username: string, password: string) => {
    const passwordHash = hashPassword(password);
    return jwt.sign({username, password: passwordHash}, SECRET_KEY, { expiresIn: '10y' });
}
