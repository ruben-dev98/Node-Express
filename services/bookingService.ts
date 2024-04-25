import { IBooking } from "../interfaces/Booking";
import { close, connection } from "../util/connection";
import { addData, deleteData, editData, find, findOne } from "../util/mySqlQueries";
import { queryAllBookings, queryDeleteBooking, queryInsertIntoBooking, queryOneBooking, queryUpdateBooking } from "../util/queries";
import { validateBooking } from "../validators/bookingValidator";

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
    const newBooking = validateBooking(data);
    const newData = await addData(conn, queryInsertIntoBooking, queryOneBooking, newBooking);
    close(conn);
    return newData as IBooking;
}

export const editBooking = async (id: any, data: IBooking): Promise<IBooking> => {
    const conn = await connection();
    const editedBooking = validateBooking(data);
    const editedData = await editData(conn, queryUpdateBooking, queryOneBooking, editedBooking, id);
    close(conn);
    return editedData as IBooking;
}

export const deleteBooking = async (id: any): Promise<IBooking> => {
    const conn = await connection();
    const deletedData = await deleteData(conn, queryDeleteBooking, queryOneBooking, id);
    close(conn);
    return deletedData as IBooking;
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