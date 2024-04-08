import { ApiError } from "../class/ApiError";
import { IBooking } from "../interfaces/Booking";
import { Booking } from "../models/Bookings";
import { internalServerError, statusCodeInternalServerError } from "../util/varToUse";

export const getAllBookings = async (): Promise<IBooking[]>  =>  {
    try {
        return await Booking.find({}).populate('room');
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
}

export const getOneBooking = async (id: any): Promise<IBooking | null> => {
    try {
        return await Booking.findById(id).populate('room');
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
}

export const addBooking = async (data: IBooking): Promise<IBooking> => {
    try {
        return (await Booking.create(data)).populate('room');
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
}

export const editBooking = async (id: any, data: IBooking): Promise<IBooking | null> => {
    try {
        return await (Booking.findByIdAndUpdate(id, data, {new: true})).populate('room');
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
}

export const deleteBooking = (id: any): string => {
    try {
        Booking.findByIdAndDelete(id);
        return 'Success';
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
}