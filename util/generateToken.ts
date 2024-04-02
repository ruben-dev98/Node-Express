import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (username: string) => {
    return jwt.sign(username, process.env.TOKEN_SECRET as string, { expiresIn: '10y' });
}
