import express, { Request, Response, NextFunction } from "express";
import { addBooking, deleteBooking, editBooking, getAllBookings, getOneBooking } from "../services/bookingService";
import { authToken } from "../middleware/auth";

export const bookingRouter = express.Router();

bookingRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    getAllBookings(res);
});

bookingRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    getOneBooking(Number(req.params.id), res);
});

bookingRouter.use(authToken);

bookingRouter.post('/', (req: Request, res: Response, _next: NextFunction) => {
    addBooking(req.body, res);
});

bookingRouter.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
    editBooking(Number(req.params.id), req.body, res);
});

bookingRouter.delete('/:id', (req: Request, res: Response, _next: NextFunction) => {
    deleteBooking(Number(req.params.id), res);
})