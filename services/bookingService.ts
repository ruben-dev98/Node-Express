import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { parseResponse } from "../util/parseResponse";
import { bookingFile } from "../util/fileNames";
import { Booking } from "../interfaces/Booking";
import { Response } from "express";

const dataBookings = readFromDataFromFile(bookingFile) as Booking[];

export const getAllBookings = (res: Response): void  =>  {
    if(dataBookings.length === 0) {
        parseResponse('Bookings not found', res);
    }
    parseResponse(dataBookings, res, 200);
}

export const getOneBooking = (id: number, res: Response): void => {
    const booking = dataBookings.find(bookingIt => bookingIt.id === id);
    if(!booking) {
        parseResponse('Booking not found', res);
    }
    parseResponse(booking, res, 200);
}

export const addBooking = (data: Booking, res: Response): void => {
    if(data) {
        const existBooking = dataBookings.findIndex(booking => booking.id === data.id);
        if(existBooking === -1) {
            dataBookings.push(data);
            writeFromDataFromFile(bookingFile, JSON.stringify(dataBookings));
            parseResponse('Booking #' + data.id + ' successfully added', res, 200);
        }
    }
    parseResponse('Error on adding a booking', res);
}

export const editBooking = (id: number, data: Booking, res: Response): void => {
    const bookingToDelete = dataBookings.findIndex(booking => booking.id === id);
    if(bookingToDelete === -1 || !data) {
        parseResponse('Error on delete edit, booking or edited data not exist', res);
    }
    dataBookings.splice(bookingToDelete, 1, data);
    writeFromDataFromFile(bookingFile, JSON.stringify(dataBookings));
    parseResponse('Booking #' + id + ' successfully edited', res, 200);
}

export const deleteBooking = (id: number, res: Response): void => {
    const bookingToDelete = dataBookings.findIndex(booking => booking.id === id);
    if(bookingToDelete === -1) {
        parseResponse('Error on delete booking, booking not exist', res);
    }
    dataBookings.splice(bookingToDelete, 1);
    writeFromDataFromFile(bookingFile, JSON.stringify(dataBookings));
    parseResponse('Booking #' + id +' deleted successfully', res, 200);
}