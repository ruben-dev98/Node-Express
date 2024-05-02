import { IRoom } from "../interfaces/Room";
import { close, connection } from "../util/connection";
import { addRoomDatabase, deleteData, editRoomDatabase, find, findOne } from "../util/mySqlQueries";
import { queryAllRoom, queryDeleteRoom, queryOneRoom, queryOneRoomByNumber } from "../util/queries";
import { validateRoom } from "../validators/roomValidator";

export const getAllRooms = async (): Promise<IRoom[]>  =>  {
    const conn = await connection();
    const result = await find(conn, queryAllRoom) as IRoom[];
    close(conn);
    return result;
}

export const getOneRoom = async (id: any): Promise<IRoom> => {
    const conn = await connection();
    const result = await findOne(conn, queryOneRoom, id) as IRoom;
    close(conn);
    return result;
}

export const addRoom = async (data: IRoom): Promise<IRoom> => {
    const conn = await connection();
    const newRoom = validateRoom(data);
    const room = await addRoomDatabase(conn, newRoom);
    close(conn);
    return room;
}

export const editRoom = async (id: any, data: IRoom): Promise<IRoom> => {
    const conn = await connection();
    const editedRoom = validateRoom(data);
    const room = await editRoomDatabase(conn, editedRoom, id);
    close(conn);
    return room;
}

export const deleteRoom = async (id: any): Promise<IRoom> => {
    const conn = await connection();
    const result = await deleteData(conn, queryDeleteRoom, queryOneRoom, id);
    close(conn);
    return result as IRoom;
}

export const getOneRoomWithNumber = async (number: any): Promise<IRoom> => {
    const conn = await connection();
    const result = await findOne(conn, queryOneRoomByNumber, number) as IRoom;
    close(conn);
    return result;
}