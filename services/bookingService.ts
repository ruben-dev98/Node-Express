/*import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { bookingFile, dataNotFoundError, invalidDataError, statusCodeErrorNotFound, statusCodeInvalidData } from "../util/varToUse";*/
import { IBooking } from "../interfaces/Booking";
//import { ApiError } from "../class/ApiError";
import { Booking } from "../models/Bookings";

export const getAllBookings = async (): Promise<IBooking[]>  =>  {
    return await Booking.find({}).populate('room');
}

export const getOneBooking = async (id: any): Promise<IBooking | null> => {
    return await Booking.findById(id).populate('room');
}

export const addBooking = async (data: IBooking): Promise<IBooking> => {
    return (await Booking.create(data)).populate('room');
}

export const editBooking = async (id: any, data: IBooking): Promise<IBooking | null> => {
    return await (Booking.findByIdAndUpdate(id, data)).populate('room');
}

export const deleteBooking = (id: any): string => {
    Booking.findByIdAndDelete(id);
    return 'Success';
}