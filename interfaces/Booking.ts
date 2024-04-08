import { Types } from "mongoose";

export interface IBooking {
    _id: Types.ObjectId,
    full_name: string,
    order_date: string,
    check_in: string,
    check_out: string,
    special_request: string,
    status: string,
    phone: string,
    email: string,
    room: Types.ObjectId
}