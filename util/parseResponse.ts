import { Response } from 'express';

export const parseResponse = (data: any, res: Response, status = 404): void => {
    res.status(status).json({
        data: data
    });
}