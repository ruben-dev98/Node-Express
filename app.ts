import express, { Express, NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import { bookingRouter } from "./controllers/bookingController";
import { roomRouter } from "./controllers/roomController";
import { employeeRouter } from "./controllers/employeeController";
import { messageRouter } from "./controllers/messageController";
import { mainRouter } from "./controllers/mainController";
import { loginRouter } from "./controllers/loginController";
import cors from 'cors';
import { authTokenMiddleware } from "./middleware/auth";
import { parseResponse } from "./util/parseResponse";
import { connection } from "./util/connection";
import { internalServerError, origins, statusCodeInternalServerError } from "./util/constants";

dotenv.config();

connection().catch(err => console.log(err));

export const app: Express = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({origin: origins}));

app.use("/login", loginRouter);
app.use("/", mainRouter);

app.use(authTokenMiddleware);

app.use("/bookings", bookingRouter);
app.use("/rooms", roomRouter);
app.use("/employees", employeeRouter);
app.use("/messages", messageRouter);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    parseResponse(err.status ? err.message : internalServerError, res, err.status || statusCodeInternalServerError);
});