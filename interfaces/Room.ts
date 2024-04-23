import { RowDataPacket } from "mysql2";

export interface IRoom extends RowDataPacket {
    _id: number,
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