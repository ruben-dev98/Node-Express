import express, { Request, Response, NextFunction } from "express";
import { addRoom, deleteRoom, editRoom, getAllRooms, getOneRoom } from "../services/roomService";

const roomRouter = express.Router();

roomRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllRooms());
    return;
});

roomRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(getOneRoom(Number(req.params.id)));
    return;
});

roomRouter.post('/', (req: Request, res: Response, _next: NextFunction) => {
    res.json(addRoom(req.body));
    return;
});

roomRouter.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(editRoom(Number(req.params.id), req.body));
    return;
});

roomRouter.delete('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(deleteRoom(Number(req.params.id)));
    return;
})