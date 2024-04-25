import { ApiError } from "../class/ApiError";
import { IRoom } from "../interfaces/Room";
import { close, connection } from "../util/connection";
import { dataNotFoundError, statusCodeErrorNotFound, tableRoom } from "../util/constants";
import { addRoomDatabase, deleteData, editRoomDatabase, find, findOne } from "../util/mySqlQueries";
import { queryAllRoom, queryOneRoom } from "../util/queries";

export const getAllRooms = async (): Promise<IRoom[]>  =>  {
    const conn = await connection();
    const sqlQuery = queryAllRoom;
    const result = await find(conn, sqlQuery) as IRoom[];
    close(conn);
    return result;
}

export const getOneRoom = async (id: any): Promise<IRoom> => {
    const conn = await connection();
    const sqlQuery = queryOneRoom;
    const result = await findOne(conn, sqlQuery, id) as IRoom;
    close(conn);
    return result;
}

export const addRoom = async (data: IRoom): Promise<IRoom> => {
    const conn = await connection();
    const room = await addRoomDatabase(conn, data);
    close(conn);
    return room;
}

export const editRoom = async (id: any, data: IRoom): Promise<IRoom> => {
    const conn = await connection();
    const result = await editRoomDatabase(conn, data, id);
    close(conn);
    return result;
}

export const deleteRoom = async (id: any): Promise<IRoom> => {
    const conn = await connection();
    const RoomDeleted = await getOneRoom(id);
    const result = await deleteData(conn, tableRoom, id);
    close(conn);
    if(result.affectedRows === 0) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    return RoomDeleted;
}

export const getOneRoomWithNumber = async (number: any): Promise<IRoom> => {
    const conn = await connection();
    const sqlQuery = `SELECT room._id, 
    room.type,
    photos.urls 'photo',
    room.number,
    room.description, room.offer, room.price,
    json_arrayagg(amenity.name) as amenities,
    room.cancellation, room.discount, room.status
    FROM amenity
    LEFT JOIN amenity_room on amenity_id = amenity._id
    RIGHT JOIN room on amenity_room.room_id = room._id
    LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM mirandahotel.photo group by room_id) as photos on photos.id_room = room._id
    WHERE room.number = ?
    GROUP BY room._id;`;
    const result = await findOne(conn, sqlQuery, number) as IRoom;
    close(conn);
    return result;
}

