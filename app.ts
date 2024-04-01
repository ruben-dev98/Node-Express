import express, { Express} from "express";
import dotenv from "dotenv";
import { bookingRouter } from "./controllers/bookingController";

dotenv.config();

export const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/bookings", bookingRouter);