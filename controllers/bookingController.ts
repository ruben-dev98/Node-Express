import express, { Request, Response, NextFunction } from "express";
import { addBooking, deleteBooking, editBooking, getAllBookings, getBookingByRoomId, getOneBooking } from "../services/bookingService";
import { parseResponse } from "../util/parseResponse";
import { statusCodeCreated, statusCodeOk } from "../util/constants";

export const bookingRouter = express.Router();

bookingRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await getAllBookings();
        parseResponse(bookings, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

bookingRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await getOneBooking(req.params.id);
        parseResponse(booking, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

bookingRouter.get('/existBooking/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await getBookingByRoomId(req.params.id);
        parseResponse(booking, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

bookingRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await addBooking(req.body);
        parseResponse(booking, res, statusCodeCreated);
    } catch (error: any) {
        next(error);
    }
});

bookingRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await editBooking(req.params.id, req.body);
        parseResponse(booking, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});



bookingRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await deleteBooking(req.params.id);
        parseResponse(booking, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
})