import express, { Request, Response, NextFunction } from "express";
import { addMessage, deleteMessage, editMessage, getAllMessages, getOneMessage } from "../services/messageService";
import { authToken } from "../middleware/auth";
import { parseResponse } from "../util/parseResponse";

export const messageRouter = express.Router();

messageRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    const messages = getAllMessages();
    if(messages.length === 0) {
        parseResponse('Messages not found', res);
    }
    parseResponse(messages, res, 200);
});

messageRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    const message = getOneMessage(Number(req.params.id));
    if(!message) {
        parseResponse('Message not found', res);
    }
    parseResponse(message, res, 200);
});

messageRouter.use(authToken);

messageRouter.post('/', (req: Request, res: Response, _next: NextFunction) => {
    const responseData =  addMessage(req.body);
    parseResponse(responseData.message, res, responseData.status);
});

messageRouter.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
    const responseData =  editMessage(Number(req.params.id), req.body);
    parseResponse(responseData.message, res, responseData.status);
});

messageRouter.delete('/:id', (req: Request, res: Response, _next: NextFunction) => {
    const responseData =  deleteMessage(Number(req.params.id));
    parseResponse(responseData.message, res, responseData.status);
})