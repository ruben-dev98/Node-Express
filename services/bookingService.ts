import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { bookingFile, dataNotFoundError, invalidDataError, statusCodeErrorNotFound, statusCodeInvalidData } from "../util/varToUse";
import { Booking } from "../interfaces/Booking";
import { ApiError } from "../class/ApiError";

const getAllDataFromFileBookings = () => readFromDataFromFile(bookingFile) as Booking[];

export const getAllBookings = (): Booking[]  =>  {
    return getAllDataFromFileBookings();
}

export const getOneBooking = (id: number): Booking | undefined => {
    return getAllDataFromFileBookings().find(bookingIt => bookingIt.id === id);
}

export const addBooking = (data: Booking): Booking => {
    const dataBookings = getAllDataFromFileBookings();
    const existBooking = dataBookings.findIndex(booking => booking.id === data.id);
    if(!data) {
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError});
    } else if(existBooking > -1) {
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError});
    }
    dataBookings.push(data);
    writeFromDataFromFile(bookingFile, JSON.stringify(dataBookings));
    return data;
}

export const editBooking = (id: number, data: Booking): Booking => {
    const dataBookings = getAllDataFromFileBookings();
    const bookingToEdit = dataBookings.findIndex(booking => booking.id === id);
    if(bookingToEdit === -1 ) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    } else if (!data) {
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError});
    }
    dataBookings.splice(bookingToEdit, 1, data);
    writeFromDataFromFile(bookingFile, JSON.stringify(dataBookings));
    return data;
}

export const deleteBooking = (id: number): string => {
    const dataBookings = getAllDataFromFileBookings();
    const bookingToDelete = dataBookings.findIndex(booking => booking.id === id);
    if(bookingToDelete === -1) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    }
    dataBookings.splice(bookingToDelete, 1);
    writeFromDataFromFile(bookingFile, JSON.stringify(dataBookings));
    return 'Success';
}