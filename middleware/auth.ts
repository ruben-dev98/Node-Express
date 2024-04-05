import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { parseResponse } from '../util/parseResponse';
import { SECRET_KEY } from '../util/getSecretKey';
import { forbiddenError, statusCodeForbidden, statusCodeUnauthorized, unauthorizedError } from '../util/varToUse';

export interface RequestUser extends Request {
    user?: any
}

export const authTokenMiddleware = (req: RequestUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return parseResponse(unauthorizedError, res, statusCodeUnauthorized);
    try {
        const tokenData = jwt.verify(token, SECRET_KEY);
        req.user = tokenData;
    } catch(error) {
        return parseResponse(forbiddenError, res, statusCodeForbidden);
    }
    next();
}