import { ApiError } from "../class/ApiError";
import { IRoom } from "../interfaces/Room";
import { close, connection } from "../util/connection";
import { dataNotFoundError, invalidDataError, statusCodeErrorNotFound, statusCodeInvalidData, tableRoom } from "../util/constants";
import { addData, deleteData, editData, find, findOne } from "../util/mySqlQueries";
import { RoomTable } from "../util/seedData/createTableRoom";

export const getAllRooms = async (): Promise<IRoom[]>  =>  {
    const conn = await connection();
    const sqlQuery = '';
    const result = await find(conn, sqlQuery) as IRoom[];
    close(conn);
    return result;
}

export const getOneRoom = async (id: any): Promise<IRoom> => {
    const conn = await connection();
    const sqlQuery = ''
    const result = await findOne(conn, sqlQuery, id) as IRoom;
    close(conn);
    return result;
}

export const addRoom = async (data: IRoom): Promise<IRoom> => {
    const conn = await connection();
    const {resultHeaders, newData} = await addData(conn, tableRoom, RoomTable, data);
    close(conn);
    if(resultHeaders.affectedRows === 0) {
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError})
    }
    return newData as IRoom;
}

export const editRoom = async (id: any, data: IRoom): Promise<IRoom> => {
    const conn = await connection();
    const {resultHeaders, newData} = await editData(conn, tableRoom, RoomTable, data, parseInt(id));
    close(conn);
    if(resultHeaders.affectedRows === 0) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    return newData as IRoom;
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
    const sqlQuery = ''
    const result = await findOne(conn, sqlQuery, number) as IRoom;
    close(conn);
    return result;
}

