import express, { Request, Response } from "express";
import path from 'path';

export const mainRouter = express.Router();

mainRouter.get('/', (_req: Request, res: Response) => {
    res.sendFile(path.resolve(process.cwd(), '/public/index.html'), (err) => console.error(err));
});