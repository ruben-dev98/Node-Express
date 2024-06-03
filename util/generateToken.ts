import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './getSecretKey';
import { Types } from 'mongoose';

export const generateAccessToken = (email: string, id: Types.ObjectId) => {
    return jwt.sign({id, email}, SECRET_KEY, { expiresIn: '10y' });
}
