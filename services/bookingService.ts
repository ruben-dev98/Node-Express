import { QueryResult } from "mysql2";
import { ApiError } from "../class/ApiError";
import { IBooking } from "../interfaces/Booking";
import { close, connection } from "../util/connection";
import { dataNotFoundError, invalidDataError, statusCodeErrorNotFound, tableBooking } from "../util/constants";
import { addData, deleteData, editData, find, findOne } from "../util/mySqlQueries";
import { BookingTable } from './../util/seedData/createTableBooking';
import { statusCodeInvalidData } from './../util/constants';

export const getAllBookings = async (): Promise<QueryResult>  =>  {
    const conn = await connection();
    const result = await find(conn, tableBooking);
    close(conn);
    return result;
}

export const getOneBooking = async (id: any): Promise<QueryResult> => {
    const conn = await connection();
    const result = await findOne(conn, tableBooking, id);
    close(conn);
    if(!result) {
        throw new ApiError({status: 400, message: 'error'})
    }
    return result;
}

export const addBooking = async (data: IBooking): Promise<QueryResult> => {
    const conn = await connection();
    const {resultHeaders, newData} = await addData(conn, tableBooking, BookingTable, data);
    close(conn);
    if(resultHeaders.affectedRows === 0) {
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError})
    }
    return newData;
}

export const editBooking = async (id: any, data: IBooking): Promise<QueryResult> => {
    const conn = await connection();
    const {resultHeaders, newData} = await editData(conn, tableBooking, BookingTable, data, parseInt(id));
    close(conn);
    if(resultHeaders.affectedRows === 0) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    return newData;
}

export const deleteBooking = async (id: any): Promise<QueryResult | null> => {
    const conn = await connection();
    const result = await deleteData(conn, tableBooking, id);
    close(conn);
    if(result.affectedRows === 0) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    return result;
}

/*export const getBookingByRoomId = async (id: any) => {
    const booking = await Booking.findOne({room: Types.ObjectId.createFromHexString(id)});
    if(booking === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return booking;
}*/