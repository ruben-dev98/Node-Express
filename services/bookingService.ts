import { Types } from "mongoose";
import { ApiError } from "../class/ApiError";
import { IBooking } from "../interfaces/Booking";
import { Booking } from "../models/Bookings";
import { dataNotFoundError, statusCodeErrorNotFound } from "../util/constants";

export const getAllBookings = async (): Promise<IBooking[]>  =>  {
    return await Booking.find({}).populate('room');
}

export const getOneBooking = async (id: any): Promise<IBooking> => {
    const booking = await Booking.findById(id).populate('room');
    if(booking === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return booking;
}

export const addBooking = async (data: IBooking): Promise<IBooking> => {
    const booking = (await Booking.create(data)).populate('room');
    if(booking === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return booking;
}

export const editBooking = async (id: any, data: IBooking): Promise<IBooking> => {
    const booking = await Booking.findByIdAndUpdate(id, data, {new: true}).populate('room');
    if(booking === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return booking;
}

export const deleteBooking = async (id: any): Promise<IBooking | null> => {
    const booking = await Booking.findByIdAndDelete(id);
    if(booking === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return booking;
}

export const getBookingByRoomId = async (id: any) => {
    const booking = await Booking.findOne({room: Types.ObjectId.createFromHexString(id)});
    if(booking === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return booking;
}