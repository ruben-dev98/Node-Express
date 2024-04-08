import { Types } from "mongoose";

export interface IRoom {
    _id: Types.ObjectId,
    photo: Array<string>,
    type: string,
    number: number,
    description: string,
    offer: boolean,
    price: number,
    cancellation: string,
    amenities: Array<string>,
    discount: number,
    status: string
}