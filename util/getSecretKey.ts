import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

dotenv.config();

export const SECRET_KEY: Secret =  process.env.TOKEN_KEY || '';