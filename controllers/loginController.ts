import { generateAccessToken } from "../util/generateToken";
import express, { Request, Response } from "express";

export const loginRouter = express.Router()

loginRouter.post('/', (_req: Request, res: Response) => {
    const token = generateAccessToken('user', 'admin');
    res.json(token);
});