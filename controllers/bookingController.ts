import express, { Request, Response, NextFunction } from "express";
import { addBooking, deleteBooking, editBooking, getAllBookings, getOneBooking } from "../services/bookingService";
import { parseResponse } from "../util/parseResponse";
import { ApiError } from "../class/ApiError";
import { dataNotFoundError, statusCodeCreated, statusCodeErrorNotFound, statusCodeOk } from "../util/varToUse";

export const bookingRouter = express.Router();

bookingRouter.get('/', (_req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = getAllBookings();
        parseResponse(bookings, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

bookingRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = getOneBooking(Number(req.params.id));
        if (!booking) {
            throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
        }
        parseResponse(booking, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

bookingRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = addBooking(req.body);
        parseResponse(booking, res, statusCodeCreated);
    } catch (error: any) {
        next(error);
    }
});

bookingRouter.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = editBooking(Number(req.params.id), req.body);
        parseResponse(booking, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

bookingRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = deleteBooking(Number(req.params.id));
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
})