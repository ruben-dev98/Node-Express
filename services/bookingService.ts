import { readFromDataFromFile, writeFromDataFromFile } from "../helpers/dataFromFile";
import { parseResponse, ParseResponse } from "../helpers/parseResponse";
import { bookingFile } from "../helpers/fileNames";
import { Booking } from "../interfaces/Booking";

const dataBookings = readFromDataFromFile(bookingFile) as Booking[];

export const getAllBookings = (): Booking[] | ParseResponse  =>  {
    if(dataBookings.length === 0) {
        return parseResponse('Bookings not found');
    }
    return dataBookings;
}

export const getOneBooking = (id: number): Booking | ParseResponse => {
    const booking = dataBookings.find(bookingIt => bookingIt.id === id);
    if(booking === undefined) {
        return parseResponse('Booking not found');
    }
    return booking;
}

export const addBooking = (data: Booking): ParseResponse => {
    if(data !== null || data !== undefined) {
        const existBooking = dataBookings.findIndex(booking => booking.id === data.id);
        if(existBooking === -1) {
            dataBookings.push(data);
            writeFromDataFromFile(bookingFile, JSON.stringify(dataBookings));
            return parseResponse('Booking #' + data.id + ' successfully added', 200);
        }
    }
    return parseResponse('Error on adding a booking');
}

export const editBooking = (id: number, data: Booking): ParseResponse => {
    const bookingToDelete = dataBookings.findIndex(booking => booking.id === id);
    if(bookingToDelete === -1 || data === null || data === undefined) {
        return parseResponse('Error on delete edit, booking or edited data not exist');
    }
    dataBookings.splice(bookingToDelete, 1, data);
    writeFromDataFromFile(bookingFile, JSON.stringify(dataBookings));
    return parseResponse('Booking #' + id + ' successfully edited', 200);
}

export const deleteBooking = (id: number): ParseResponse => {
    const bookingToDelete = dataBookings.findIndex(booking => booking.id === id);
    if(bookingToDelete === -1) {
        return parseResponse('Error on delete booking, booking not exist');
    }
    dataBookings.splice(bookingToDelete, 1);
    writeFromDataFromFile(bookingFile, JSON.stringify(dataBookings));
    return parseResponse('Booking #' + id +' deleted successfully', 200);
}