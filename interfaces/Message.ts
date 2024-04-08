import { Types } from "mongoose";

export interface IMessage {
    _id: Types.ObjectId,
    full_name: string,
    email: string,
    phone: string,
    subject: string,
    messages: string,
    date: string,
    read: boolean,
    archived: boolean,
    photo: string,
    time_passed: string
}