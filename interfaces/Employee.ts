import { Types } from "mongoose";

export interface IEmployee {
    _id: Types.ObjectId,
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