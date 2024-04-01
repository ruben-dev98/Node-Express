import express, { Request, Response, NextFunction } from "express";
import { addBooking, deleteBooking, editBooking, getAllBookings, getOneBooking } from "../services/bookingService";

export const bookingRouter = express.Router();

bookingRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllBookings());
    return;
});

bookingRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(getOneBooking(Number(req.params.id)));
    return;
});

bookingRouter.post('/', (req: Request, res: Response, _next: NextFunction) => {
    res.json(addBooking(req.body));
    return;
});

bookingRouter.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(editBooking(Number(req.params.id), req.body));
    return;
});

bookingRouter.delete('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(deleteBooking(Number(req.params.id)));
    return;
})