import express, { Request, Response, NextFunction } from "express";
import { addBooking, deleteBooking, editBooking, getAllBookings, getOneBooking } from "../services/bookingService";
import { authToken } from "../middleware/auth";
import { parseResponse } from "../util/parseResponse";

export const bookingRouter = express.Router();

bookingRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    const bookings = getAllBookings();
    if (bookings.length === 0) {
        parseResponse('Bookings not found', res);
    }
    parseResponse(bookings, res, 200);
});

bookingRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    const booking = getOneBooking(Number(req.params.id));
    if (!booking) {
        parseResponse('Booking not found', res);
    }
    parseResponse(booking, res, 200);
});

bookingRouter.use(authToken);

bookingRouter.post('/', (req: Request, res: Response, _next: NextFunction) => {
    const responseData = addBooking(req.body);
    parseResponse(responseData.message, res, responseData.status);
});

bookingRouter.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
    const responseData = editBooking(Number(req.params.id), req.body);
    parseResponse(responseData.message, res, responseData.status);
});

bookingRouter.delete('/:id', (req: Request, res: Response, _next: NextFunction) => {
    const responseData = deleteBooking(Number(req.params.id));
    parseResponse(responseData.message, res, responseData.status);
})