import express, { Request, Response, NextFunction } from "express";
import { addRoom, deleteRoom, editRoom, getAllRooms, getOneRoom } from "../services/roomService";
import { authToken } from "../middleware/auth";
import { parseResponse } from "../util/parseResponse";

export const roomRouter = express.Router();

roomRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    const rooms = getAllRooms();
    if(rooms.length === 0) {
        parseResponse('Rooms not found', res);
    }
    parseResponse(rooms, res, 200);
});

roomRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    const room = getOneRoom(Number(req.params.id));
    if(!room) {
        parseResponse('Room not found', res);
    }
    parseResponse(room, res, 200);
});

roomRouter.use(authToken);

roomRouter.post('/', (req: Request, res: Response, _next: NextFunction) => {
    const responseData =  addRoom(req.body);
    parseResponse(responseData.message, res, responseData.status);
});

roomRouter.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
    const responseData =  editRoom(Number(req.params.id), req.body);
    parseResponse(responseData.message, res, responseData.status);
});

roomRouter.delete('/:id', (req: Request, res: Response, _next: NextFunction) => {
    const responseData =  deleteRoom(Number(req.params.id));
    parseResponse(responseData.message, res, responseData.status);
})