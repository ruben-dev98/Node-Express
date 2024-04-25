
import mysql, { PreparedStatementInfo, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IBooking } from '../interfaces/Booking';
import { IMessage } from '../interfaces/Message';
import { IRoom } from '../interfaces/Room';
import { IEmployee } from '../interfaces/Employee';
import { ApiError } from '../class/ApiError';
import { dataNotFoundError, invalidDataError, statusCodeErrorNotFound, statusCodeInvalidData, tableAmenityRoom, tablePhoto } from './constants';
import { close } from './connection';
import { queryInsertIntoAmenityRoom, queryInsertIntoPhoto, queryInsertIntoRoom, queryOneRoom, queryUpdateRoom } from './queries';

type data = IBooking | IMessage | IRoom | IEmployee;

export const find = async (conn: mysql.PoolConnection, sqlQuery: string) => {
    const [results, _fields] = await conn.execute(sqlQuery);
    const data = results as data[];
    return data;
}

export const findOne = async (conn: mysql.PoolConnection, sqlQuery: string, value: any) => {
    const result = await getResults(conn, sqlQuery, [value]) as RowDataPacket[];
    if (result.length === 0) {
        throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError })
    }
    const data = result[0] as data;
    return data;
}

export const addData = async (conn: mysql.PoolConnection, sqlQuery: string, searchQuery: string, values: any[]) => {
    const resultHeaders = await getResults(conn, sqlQuery, values) as ResultSetHeader;
    if (resultHeaders.affectedRows === 0) {
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError })
    }
    const insertedId: number = resultHeaders.insertId;
    const newData = await findOne(conn, searchQuery, [insertedId]);
    return newData;
}

export const editData = async (conn: mysql.PoolConnection, sqlQuery: string, searchQuery: string, values: any[], id: number) => {
    const resultHeaders = await getResults(conn, sqlQuery, [...values, id]) as ResultSetHeader;
    if(resultHeaders.affectedRows === 0) {
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    }
    await conn.commit();
    const editedData = await findOne(conn, searchQuery, [id]);
    return editedData;
}

export const deleteData = async (conn: mysql.PoolConnection, sqlQuery: string, searchQuery: string, id: number) => {
    const deldata = await findOne(conn, searchQuery, id);
    const resultHeaders = await getResults(conn, sqlQuery, [id]) as ResultSetHeader;
    if (resultHeaders.affectedRows === 0) {
        throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
    }
    return deldata;
}

export const addRoomDatabase = async (conn: mysql.PoolConnection, data: IRoom) => {
    const photos = data.photo;
    const amenities = data.amenities;
    const values = [data.type, data.number, data.description, data.offer, data.price, data.cancellation, data.discount, data.status];
    const sqlQueryRoom = queryInsertIntoRoom;
    const resultsHeadersRoom = await getResults(conn, sqlQueryRoom, values) as ResultSetHeader;
    if (resultsHeadersRoom.affectedRows === 0) {
        await conn.rollback();
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    }
    const insertedId = resultsHeadersRoom.insertId;
    await addPhotos(conn, photos, insertedId);
    await addAmenities(conn, amenities, insertedId);
    await conn.commit();
    const newRoom = await findOne(conn, queryOneRoom, [insertedId]);
    return newRoom as IRoom;
};

export const editRoomDatabase = async (conn: mysql.PoolConnection, data: IRoom, id: number) => {
    const photos = data.photo;
    const amenities = data.amenities;
    const values = [data.type, data.number, data.description, data.offer, data.price, data.cancellation, data.discount, data.status, id];
    const sqlQueryRoom = queryUpdateRoom;
    const resultsHeadersRoom = await getResults(conn, sqlQueryRoom, values) as ResultSetHeader;
    if (resultsHeadersRoom.affectedRows === 0) {
        await conn.rollback();
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    }
    await deleteDataRelatedToRoom(conn, id, tablePhoto);
    await deleteDataRelatedToRoom(conn, id, tableAmenityRoom)
    await addPhotos(conn, photos, id);
    await addAmenities(conn, amenities, id);
    const newRoom = await findOne(conn, queryOneRoom, [id]);
    return newRoom as IRoom;
};

const addPhotos = async (conn: mysql.PoolConnection, photos: Array<string>, room_id: number) => {
    for (let photo of photos) {
        const resultHeadersPhoto = await getResults(conn, queryInsertIntoPhoto, [photo, room_id]) as ResultSetHeader;
        if (resultHeadersPhoto.affectedRows === 0) {
            await conn.rollback();
            await close(conn);
            throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
        }
    }
}

const addAmenities = async (conn: mysql.PoolConnection, amenities: Array<string>, room_id: number) => {
    for (let amenity of amenities) {
        const sqlQueryAmenityId = `SELECT _id from amenity WHERE name = ?`;
        const currentAmenity = await findOne(conn, sqlQueryAmenityId, [amenity]);
        const resultHeadersAmenity = await getResults(conn, queryInsertIntoAmenityRoom, [currentAmenity._id, room_id]) as ResultSetHeader;
        if (resultHeadersAmenity.affectedRows === 0) {
            await conn.rollback();
            await close(conn);
            throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
        }
    }
}

const deleteDataRelatedToRoom = async (conn: mysql.PoolConnection, room_id: number, tableName: string) => {
    const sqlQueryDeletePhotos = `DELETE FROM ${tableName} WHERE room_id = ?`;
    const resultHeadersDeletePhoto = await getResults(conn, sqlQueryDeletePhotos, [room_id]) as ResultSetHeader;
    if (resultHeadersDeletePhoto.affectedRows === 0) {
        await conn.rollback();
        await close(conn);
        throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
    }
}

const getResults = async (conn: mysql.PoolConnection, sqlQuery: string, values: any[]) => {
    const preparedStatement = await conn.prepare(sqlQuery);
    const [ result ] = await preparedStatement.execute(values);
    clearPreparedStatements(conn, preparedStatement, sqlQuery);
    return result;
}

const clearPreparedStatements = (conn: mysql.PoolConnection, preparedStatement: PreparedStatementInfo, sqlQuery: string) => {
    preparedStatement.close();
    conn.unprepare(sqlQuery);
}