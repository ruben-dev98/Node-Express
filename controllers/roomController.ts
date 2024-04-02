import express, { Request, Response, NextFunction } from "express";
import { addRoom, deleteRoom, editRoom, getAllRooms, getOneRoom } from "../services/roomService";
import { authToken } from "../middleware/auth";

export const roomRouter = express.Router();

roomRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    getAllRooms(res);
});

roomRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    getOneRoom(Number(req.params.id), res);
});

roomRouter.use(authToken);

roomRouter.post('/', (req: Request, res: Response, _next: NextFunction) => {
    addRoom(req.body, res);
});

roomRouter.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
    editRoom(Number(req.params.id), req.body, res);
});

roomRouter.delete('/:id', (req: Request, res: Response, _next: NextFunction) => {
    deleteRoom(Number(req.params.id), res);
})