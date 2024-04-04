import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { bookingFile } from "../util/fileNames";
import { Booking } from "../interfaces/Booking";
import { ResponseStatus } from "../interfaces/ResponseStatus";

const dataBookings = readFromDataFromFile(bookingFile) as Booking[];

export const getAllBookings = (): Booking[]  =>  {
    return dataBookings;
}

export const getOneBooking = (id: number): Booking | undefined => {
    return dataBookings.find(bookingIt => bookingIt.id === id);
}

export const addBooking = (data: Booking): ResponseStatus => {
    if(data) {
        const existBooking = dataBookings.findIndex(booking => booking.id === data.id);
        if(existBooking === -1) {
            dataBookings.push(data);
            writeFromDataFromFile(bookingFile, JSON.stringify(dataBookings));
            return {
                status: 200,
                message: 'Booking #' + data.id + ' successfully added'
            }
        }
    }
    return {
        status: 400,
        message: 'Error on adding booking'
    }
}

export const editBooking = (id: number, data: Booking): ResponseStatus => {
    const bookingToDelete = dataBookings.findIndex(booking => booking.id === id);
    if(bookingToDelete === -1 || !data) {
        return {
            status: 404,
            message: 'Error on edit booking, booking or edited data not exist'
        }
    }
    dataBookings.splice(bookingToDelete, 1, data);
    writeFromDataFromFile(bookingFile, JSON.stringify(dataBookings));
    return {
        status: 200,
        message: 'Booking #' + id + ' successfully edited'
    }
}

export const deleteBooking = (id: number): ResponseStatus => {
    const bookingToDelete = dataBookings.findIndex(booking => booking.id === id);
    if(bookingToDelete === -1) {
        return {
            status: 404,
            message: 'Error on delete booking, booking not exist'
        }
    }
    dataBookings.splice(bookingToDelete, 1);
    writeFromDataFromFile(bookingFile, JSON.stringify(dataBookings));
    return {
        status: 200,
        message: 'Booking #' + id + ' deleted successfully'
    }
}