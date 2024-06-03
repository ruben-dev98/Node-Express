import express, { Request, Response, NextFunction } from "express";
import { addMessage, deleteMessage, editMessage, getAllMessages, getOneMessage } from "../services/messageService";
import { parseResponse } from "../util/parseResponse";
import { statusCodeCreated, statusCodeOk } from "../util/constants";

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
        const message = await getOneMessage(req.params.id);
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
        const message = await editMessage(req.params.id, req.body);
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

messageRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await deleteMessage(req.params.id);
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
})