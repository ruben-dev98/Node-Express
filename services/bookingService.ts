import { ApiError } from "../class/ApiError";
import { IBooking } from "../interfaces/Booking";
import { close, connection } from "../util/connection";
import { dataNotFoundError, invalidDataError, statusCodeErrorNotFound, tableBooking } from "../util/constants";
import { addData, deleteData, editData, find, findOne } from "../util/mySqlQueries";
import { BookingTable } from './../util/seedData/createTableBooking';
import { statusCodeInvalidData } from './../util/constants';

export const getAllBookings = async (): Promise<IBooking[]>  =>  {
    const conn = await connection();
    const sqlQuery = `SELECT booking._id,
    booking.full_name,
    booking.order_date, 
    booking.check_in,
    booking.check_out,
    booking.special_request,
    booking.status,
    booking.discount,
    booking.phone,
    booking.email,
    JSON_OBJECT('_id', room._id, 
    'photo', photos.urls,
    'type', room.type, 'number', room.number, 
    'description', room.description, 'offer', room.offer, 'price', room.price,
    'amenities', json_arrayagg(amenity.name),
    'cancellation', room.cancellation, 'discount', room.discount, 'status', room.status) 'room'
    FROM amenity
    LEFT JOIN amenity_room on amenity_id = amenity._id
    RIGHT JOIN room on amenity_room.room_id = room._id
    INNER JOIN booking on booking.room_id = room._id
    LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM mirandahotel.photo group by room_id) as photos on photos.id_room = room._id
    GROUP BY booking._id;`
    const result = await find(conn, sqlQuery) as IBooking[];
    close(conn);
    return result;
}

export const getOneBooking = async (id: any): Promise<IBooking> => {
    const conn = await connection();
    const sqlQuery = `SELECT booking._id,
    booking.full_name,
    booking.order_date, 
    booking.check_in,
    booking.check_out,
    booking.special_request,
    booking.status,
    booking.discount,
    booking.phone,
    booking.email,
    JSON_OBJECT('_id', room._id, 
    'photo', photos.urls,
    'type', room.type, 'number', room.number, 
    'description', room.description, 'offer', room.offer, 'price', room.price,
    'amenities', json_arrayagg(amenity.name),
    'cancellation', room.cancellation, 'discount', room.discount, 'status', room.status) 'room'
    FROM amenity
    LEFT JOIN amenity_room on amenity_id = amenity._id
    RIGHT JOIN room on amenity_room.room_id = room._id
    INNER JOIN booking on booking.room_id = room._id
    LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM mirandahotel.photo group by room_id) as photos on photos.id_room = room._id
    WHERE booking._id = ?
    GROUP BY booking._id;`;
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