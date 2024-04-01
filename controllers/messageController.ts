import express, { Request, Response, NextFunction } from "express";
import { addMessage, deleteMessage, editMessage, getAllMessages, getOneMessage } from "../services/messageService";

export const messageRouter = express.Router();

messageRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllMessages());
    return;
});

messageRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(getOneMessage(Number(req.params.id)));
    return;
});

messageRouter.post('/', (req: Request, res: Response, _next: NextFunction) => {
    res.json(addMessage(req.body));
    return;
});

messageRouter.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(editMessage(Number(req.params.id), req.body));
    return;
});

messageRouter.delete('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(deleteMessage(Number(req.params.id)));
    return;
})