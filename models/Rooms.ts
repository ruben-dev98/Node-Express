import { Schema, Types, model } from "mongoose";
import { IRoom } from './../interfaces/Room';

const roomSchema = new Schema<IRoom>({
    _id: Types.ObjectId,
    photo: Types.Array<string>,
    type: { type: String, required: true},
    number: { type: Number, required: true, unique: true},
    description: { type: String, required: true},
    offer: { type: Boolean, required: true},
    price: { type: Number, required: true},
    cancellation: { type: String, required: true},
    amenities: Types.Array<string>,
    discount: { type: Number, required: true},
    status: { type: String, required: true},
});

export const Room = model<IRoom>('Booking', roomSchema);