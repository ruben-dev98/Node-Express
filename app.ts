import express, { Express} from "express";
import dotenv from "dotenv";
import { bookingRouter } from "./controllers/bookingController";
import { roomRouter } from "./controllers/roomController";
import { employeeRouter } from "./controllers/employeeController";
import { messageRouter } from "./controllers/messageController";
import { mainRouter } from "./controllers/mainController";
import { loginRouter } from "./controllers/loginController";

dotenv.config();

export const app: Express = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", loginRouter);
app.use("/bookings", bookingRouter);
app.use("/rooms", roomRouter);
app.use("/employees", employeeRouter);
app.use("/messages", messageRouter);

app.use("/", mainRouter);