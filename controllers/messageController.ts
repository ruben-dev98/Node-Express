import express, { Request, Response, NextFunction } from "express";
import { addMessage, deleteMessage, editMessage, getAllMessages, getOneMessage } from "../services/messageService";
import { parseResponse } from "../util/parseResponse";
import { dataNotFoundError, statusCodeCreated, statusCodeErrorNotFound, statusCodeOk } from "../util/varToUse";
import { ApiError } from "../class/ApiError";

export const messageRouter = express.Router();

messageRouter.get('/', (_req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = getAllMessages();
        parseResponse(messages, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

messageRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = getOneMessage(Number(req.params.id));
        if (!message) {
            throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
        }
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

messageRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = addMessage(req.body);
        parseResponse(message, res, statusCodeCreated);
    } catch (error: any) {
        next(error);
    }
});

messageRouter.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = editMessage(Number(req.params.id), req.body);
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

messageRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = deleteMessage(Number(req.params.id));
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
})