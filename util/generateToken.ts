import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './getSecretKey';

export const generateAccessToken = (username: string, password: string) => {
    
    return jwt.sign({username, password}, SECRET_KEY, { expiresIn: '10y' });
}
