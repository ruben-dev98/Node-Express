import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { parseResponse } from '../util/parseResponse';
import { SECRET_KEY } from '../util/getSecretKey';

export interface RequestUser extends Request {
    user?: any
}

export const authToken = (req: RequestUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === undefined || token === null) return res.json(parseResponse('Unauthorized. The request lacks basic authentication', 401));

    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
        console.log(err);
        if(err) return res.json(parseResponse('Forbidden. The server understood the request but refused to authorize it.', 403));

        req.user = user;

        next();
    })
}