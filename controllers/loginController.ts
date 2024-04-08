import { generateAccessToken } from "../util/generateToken";
import express, { Request, Response } from "express";

export const loginRouter = express.Router()

loginRouter.post('/', (req: Request, res: Response) => {
    const {user, password} = req.body;
    const token = generateAccessToken(user, password);
    res.json(token);
});