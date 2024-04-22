import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './getSecretKey';

export const generateAccessToken = (email: string, id: number) => {
    return jwt.sign({id, email}, SECRET_KEY, { expiresIn: '10y' });
}
