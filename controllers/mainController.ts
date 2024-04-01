import express, { Request, Response } from "express";

export const mainRouter = express.Router();

mainRouter.get('/', (_req: Request, res: Response) => {
    res.sendFile(__dirname + '/public/index.html', (err) => console.error(err));
});