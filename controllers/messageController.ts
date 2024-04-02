import express, { Request, Response, NextFunction } from "express";
import { addMessage, deleteMessage, editMessage, getAllMessages, getOneMessage } from "../services/messageService";
import { authToken } from "../middleware/auth";

export const messageRouter = express.Router();

messageRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    getAllMessages(res);
});

messageRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    getOneMessage(Number(req.params.id), res);
});

messageRouter.use(authToken);

messageRouter.post('/', (req: Request, res: Response, _next: NextFunction) => {
    addMessage(req.body, res);
});

messageRouter.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
    editMessage(Number(req.params.id), req.body, res);
});

messageRouter.delete('/:id', (req: Request, res: Response, _next: NextFunction) => {
    deleteMessage(Number(req.params.id), res);
})