import { RowDataPacket } from "mysql2";

export interface IEmployee extends RowDataPacket {
    _id: number,
    photo: string,
    full_name: string,
    email: string,
    start_date: string,
    description: string,
    job: string,
    contact: string,
    status: boolean,
    password: string
}