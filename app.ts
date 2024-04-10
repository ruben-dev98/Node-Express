import express, { Express, NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import { bookingRouter } from "./controllers/bookingController";
import { roomRouter } from "./controllers/roomController";
import { employeeRouter } from "./controllers/employeeController";
import { messageRouter } from "./controllers/messageController";
import { mainRouter } from "./controllers/mainController";
import { loginRouter } from "./controllers/loginController";
import { authTokenMiddleware } from "./middleware/auth";
import { parseResponse } from "./util/parseResponse";
import mongoose from "mongoose";

dotenv.config();

async function main() {
    await mongoose.connect(`${process.env.SERVER}://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DB_NAME}`);
  // use 'await mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DB_NAME}`);' if your database has auth enabled
}

main().catch(err => console.log(err));

export const app: Express = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", loginRouter);
app.use("/", mainRouter);

app.use(authTokenMiddleware);

app.use("/bookings", bookingRouter);
app.use("/rooms", roomRouter);
app.use("/employees", employeeRouter);
app.use("/messages", messageRouter);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    parseResponse(err.message, res, err.status);
});