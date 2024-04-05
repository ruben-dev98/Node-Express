import express, { Request, Response, NextFunction } from "express";
import { addRoom, deleteRoom, editRoom, getAllRooms, getOneRoom } from "../services/roomService";
import { parseResponse } from "../util/parseResponse";
import { dataNotFoundError, statusCodeCreated, statusCodeErrorNotFound, statusCodeOk } from "../util/varToUse";
import { ApiError } from "../class/ApiError";

export const roomRouter = express.Router();

roomRouter.get('/', (_req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = getAllRooms();
        parseResponse(rooms, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

roomRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = getOneRoom(Number(req.params.id));
        if (!room) {
            throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError })
        }
        parseResponse(room, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

roomRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = addRoom(req.body);
        parseResponse(room, res, statusCodeCreated);
    } catch (error: any) {
        next(error);
    }
});

roomRouter.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = editRoom(Number(req.params.id), req.body);
        parseResponse(room, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

roomRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = deleteRoom(Number(req.params.id));
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
})