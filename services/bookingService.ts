import { ApiError } from "../class/ApiError";
import { IBooking } from "../interfaces/Booking";
import { close, connection } from "../util/connection";
import { dataNotFoundError, invalidDataError, statusCodeErrorNotFound, tableBooking } from "../util/constants";
import { addData, deleteData, editData, find, findOne } from "../util/mySqlQueries";
import { BookingTable } from './../util/seedData/createTableBooking';
import { statusCodeInvalidData } from './../util/constants';
import { queryAllBookings, queryOneBooking } from "../util/queries";

export const getAllBookings = async (): Promise<IBooking[]>  =>  {
    const conn = await connection();
    const sqlQuery = queryAllBookings;
    const result = await find(conn, sqlQuery) as IBooking[];
    close(conn);
    return result;
}

export const getOneBooking = async (id: any): Promise<IBooking> => {
    const conn = await connection();
    const sqlQuery = queryOneBooking;
    const result = await findOne(conn, sqlQuery, id) as IBooking;
    close(conn);
    return result;
}

export const addBooking = async (data: IBooking): Promise<IBooking> => {
    const conn = await connection();
    const {resultHeaders, newData} = await addData(conn, tableBooking, BookingTable, data);
    if(resultHeaders.affectedRows === 0) {
        await conn.rollback();
        close(conn);
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError})
    }
    await conn.commit();
    close(conn);
    return newData as IBooking;
}

export const editBooking = async (id: any, data: IBooking): Promise<IBooking> => {
    const conn = await connection();
    const {resultHeaders, newData} = await editData(conn, tableBooking, BookingTable, data, parseInt(id));
    if(resultHeaders.affectedRows === 0) {
        await conn.rollback();
        close(conn);
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    await conn.commit();
    close(conn);
    return newData as IBooking;
}

export const deleteBooking = async (id: any): Promise<IBooking> => {
    const conn = await connection();
    const bookingDeleted = await getOneBooking(id);
    const result = await deleteData(conn, tableBooking, id);
    if(result.affectedRows === 0) {
        await conn.rollback();
        close(conn);
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    await conn.commit();
    close(conn);
    return bookingDeleted;
}

export const getBookingByRoomId = async (id: any) => {
    const conn = await connection();
    const sqlQuery = `SELECT booking._id,
    booking.full_name,
    booking.order_date, 
    booking.check_in, booking.check_out,
    booking.special_request,
    booking.status,
    booking.discount,
    booking.phone,
    booking.email,
    JSON_OBJECT('_id', room._id, 'type', room.type, 'number', room.number, 
    'description', room.description, 'offer', room.offer, 'price', room.price, 
    'cancellation', room.cancellation, 'discount', room.discount, 'status', room.status) 'room' FROM mirandahotel.booking INNER JOIN room on room_id = room._id WHERE room.number = ?;
    `
    const result = await findOne(conn, sqlQuery, id) as IBooking;
    close(conn);
    return result;
}