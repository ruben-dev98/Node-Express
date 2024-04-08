import express, { Request, Response, NextFunction } from "express";
import { addRoom, deleteRoom, editRoom, getAllRooms, getOneRoom } from "../services/roomService";
import { parseResponse } from "../util/parseResponse";
import { dataNotFoundError, statusCodeCreated, statusCodeErrorNotFound, statusCodeOk } from "../util/varToUse";
import { ApiError } from "../class/ApiError";

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
        const room = await getOneRoom(Number(req.params.id));
        if (room === null) {
            throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
        }
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
        const room = await editRoom(Number(req.params.id), req.body);
        if (room === null) {
            throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
        }
        parseResponse(room, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

roomRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await deleteRoom(Number(req.params.id));
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
})