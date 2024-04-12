import express, { Request, Response, NextFunction } from "express";
import { addRoom, deleteRoom, editRoom, getAllRooms, getOneRoom } from "../services/roomService";
import { parseResponse } from "../util/parseResponse";
import { statusCodeCreated, statusCodeOk } from "../util/constants";

export const roomRouter = express.Router();

roomRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await getAllRooms();
        parseResponse(rooms, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

roomRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = await getOneRoom(req.params.id);
        parseResponse(room, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

roomRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = await addRoom(req.body);
        parseResponse(room, res, statusCodeCreated);
    } catch (error: any) {
        next(error);
    }
});

roomRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = await editRoom(req.params.id, req.body);
        parseResponse(room, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

roomRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = await deleteRoom(req.params.id);
        parseResponse(room, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
})