import express, { Request, Response, NextFunction } from "express";
import { addMessage, deleteMessage, editMessage, getAllMessages, getOneMessage } from "../services/messageService";
import { parseResponse } from "../util/parseResponse";
import { dataNotFoundError, statusCodeCreated, statusCodeErrorNotFound, statusCodeOk } from "../util/varToUse";
import { ApiError } from "../class/ApiError";

export const messageRouter = express.Router();

messageRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = await getAllMessages();
        parseResponse(messages, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

messageRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message =  await getOneMessage(Number(req.params.id));
        if (message === null) {
            throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
        }
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

messageRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await addMessage(req.body);
        parseResponse(message, res, statusCodeCreated);
    } catch (error: any) {
        next(error);
    }
});

messageRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await editMessage(Number(req.params.id), req.body);
        if (message === null) {
            throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
        }
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

messageRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await deleteMessage(Number(req.params.id));
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
})