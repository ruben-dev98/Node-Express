import { RowDataPacket } from "mysql2";
import { IRoom } from "./Room";

export interface IBooking extends RowDataPacket {
    _id: number
    full_name: string,
    order_date: string,
    check_in: string,
    check_out: string,
    special_request: string,
    status: string,
    discount: number,
    phone: string,
    email: string,
    room: IRoom
}

