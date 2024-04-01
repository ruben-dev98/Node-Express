import express, { Request, Response, NextFunction } from "express";
import { addRoom, deleteRoom, editRoom, getAllRooms, getOneRoom } from "../services/roomService";

const roomRouter = express.Router();

roomRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllRooms());
});

roomRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(getOneRoom(Number(req.params.id)));
});

roomRouter.post('/', (req: Request, _res: Response, _next: NextFunction) => {
    addRoom(req.body);
});

roomRouter.put('/:id', (req: Request, _res: Response, _next: NextFunction) => {
    editRoom(Number(req.params.id), req.body);
});

roomRouter.delete('/:id', (req: Request, _res: Response, _next: NextFunction) => {
    deleteRoom(Number(req.params.id));
})