import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './getSecretKey';

export const generateAccessToken = (username: string) => {
    console.log(SECRET_KEY);
    return jwt.sign({username}, SECRET_KEY, { expiresIn: '10y' });
}
