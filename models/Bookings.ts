import { Model, Schema, model } from "mongoose";
import { IBooking } from "../interfaces/Booking";

const bookingSchema = new Schema<IBooking>({
    full_name: { type: String, required: true},
    order_date: { type: String, required: true},
    check_in: { type: String, required: true},
    check_out: { type: String, required: true},
    special_request: { type: String, required: false},
    status: { type: String, required: true},
    discount: { type: Number, required: true},
    phone: { type: String, required: true},
    email: { type: String, required: true},
    room: {type: Schema.Types.ObjectId, ref: 'rooms'}
}, {timestamps: true});

export const Booking = model<IBooking, Model<IBooking>>('bookings', bookingSchema);