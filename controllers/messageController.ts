import express, { Request, Response, NextFunction } from "express";
import { addMessage, deleteMessage, editMessage, getAllMessages, getOneMessage } from "../services/messageService";

const messageRouter = express.Router();

messageRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllMessages());
});

messageRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(getOneMessage(Number(req.params.id)));
});

messageRouter.post('/', (req: Request, _res: Response, _next: NextFunction) => {
    addMessage(req.body);
});

messageRouter.put('/:id', (req: Request, _res: Response, _next: NextFunction) => {
    editMessage(Number(req.params.id), req.body);
});

messageRouter.delete('/:id', (req: Request, _res: Response, _next: NextFunction) => {
    deleteMessage(Number(req.params.id));
})