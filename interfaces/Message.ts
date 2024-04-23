import { RowDataPacket } from "mysql2";

export interface IMessage extends RowDataPacket {
    _id: number,
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