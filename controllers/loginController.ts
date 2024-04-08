import { ApiError } from "../class/ApiError";
import { getLoginUser } from "../services/loginService";
import { generateAccessToken } from "../util/generateToken";
import express, { NextFunction, Request, Response } from "express";
import { dataNotFoundError, statusCodeErrorNotFound, statusCodeOk, statusCodeUnauthorized, unauthorizedError } from "../util/varToUse";
import { comparePassword, hashPassword } from "../util/cryptPassword";
import { parseResponse } from "../util/parseResponse";

export const loginRouter = express.Router()

loginRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const employee = await getLoginUser(email);
        const passwordHash = hashPassword(password);
        if(employee === null) {
            throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
        } else if(comparePassword(employee.password, passwordHash)) {
            throw new ApiError({status: statusCodeUnauthorized, message: unauthorizedError});
        }
        const token = generateAccessToken(email, passwordHash);
        parseResponse(token, res, statusCodeOk);
    } catch(error) {
        next(error);
    }
});