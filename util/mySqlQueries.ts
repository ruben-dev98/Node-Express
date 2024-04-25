
import mysql, { PreparedStatementInfo, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Tables } from '../interfaces/Tables';
import { IBooking } from '../interfaces/Booking';
import { IMessage } from '../interfaces/Message';
import { IRoom } from '../interfaces/Room';
import { IEmployee } from '../interfaces/Employee';
import { ApiError } from '../class/ApiError';
import { dataNotFoundError, invalidDataError, statusCodeErrorNotFound, statusCodeInvalidData, tableAmenityRoom, tablePhoto } from './constants';
import { close } from './connection';
import { queryOneRoom } from './queries';

type data = IBooking | IMessage | IRoom | IEmployee;

export const find = async (conn: mysql.PoolConnection, sqlQuery: string) => {
    const [results, _fields] = await conn.execute(sqlQuery);
    const data = results as data[];
    return data;
}

export const findOne = async (conn: mysql.PoolConnection, sqlQuery: string, value: any) => {
    const preparedStatement = await conn.prepare(sqlQuery);
    const [results, _fields] = await preparedStatement.execute([value]);
    const result = results as RowDataPacket[];
    if (result.length === 0) {
        clearPreparedStatements(conn, preparedStatement, sqlQuery);
        close(conn);
        throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError })
    }
    const data = result[0] as data;
    clearPreparedStatements(conn, preparedStatement, sqlQuery);
    return data;
}

export const addData = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[], data: data) => {
    const { sqlQuery, values } = createQueryInsert(tableName, fields, data);
    const resultHeaders = await getResultHeaders(conn, sqlQuery, values);
    const insertedId: number = resultHeaders.insertId;
    const newData = await findEditedAddedOne(conn, tableName, insertedId);
    return { resultHeaders, newData };
}

export const editData = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[], data: data, id: number) => {
    const { sqlQuery, values } = createQueryUpdate(tableName, fields, data);
    values.push(id);
    const resultHeaders = await getResultHeaders(conn, sqlQuery, values);
    const newData = await findEditedAddedOne(conn, tableName, id);
    return { resultHeaders, newData };
}

export const deleteData = async (conn: mysql.PoolConnection, tableName: string, id: number) => {
    const sqlQuery = `DELETE FROM ${tableName} WHERE _id = ?`;
    const resultHeaders = await getResultHeaders(conn, sqlQuery, [id]);
    return resultHeaders;
}

export const addRoomDatabase = async (conn: mysql.PoolConnection, data: IRoom) => {
    const photos = data.photo;
    const amenities = data.amenities;
    const values = [data.type, data.number, data.description, data.offer, data.price, data.cancellation, data.discount, data.status];
    const sqlQueryRoom = `INSERT INTO room 
    (type, number, description, offer, price, cancellation, discount, status) 
    VALUES (?,?,?,?,?,?,?,?)`;
    const resultsHeadersRoom = await getResultHeaders(conn, sqlQueryRoom, values);
    if (resultsHeadersRoom.affectedRows === 0) {
        await conn.rollback();
        await close(conn);
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    }
    const insertedId = resultsHeadersRoom.insertId;
    await addPhotos(conn, photos, insertedId);
    await addAmenities(conn, amenities, insertedId);
    await conn.commit();
    const newRoom = await findOne(conn, queryOneRoom, insertedId);
    return newRoom as IRoom;
};

export const editRoomDatabase = async (conn: mysql.PoolConnection, data: IRoom, id: number) => {
    const photos = data.photo;
    const amenities = data.amenities;
    const values = [data.type, data.number, data.description, data.offer, data.price, data.cancellation, data.discount, data.status, id];
    const sqlQueryRoom = `UPDATE room SET
    type = ?, number = ?, description = ?, offer = ?, price = ?, cancellation = ?, discount = ?, status = ? 
    WHERE _id = ?`;
    const resultsHeadersRoom = await getResultHeaders(conn, sqlQueryRoom, values);
    if (resultsHeadersRoom.affectedRows === 0) {
        await conn.rollback();
        await close(conn);
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    }
    await deleteDataRelatedToRoom(conn, id, tablePhoto);
    await deleteDataRelatedToRoom(conn, id, tableAmenityRoom)
    await addPhotos(conn, photos, id);
    await addAmenities(conn, amenities, id);
    const newRoom = await findOne(conn, queryOneRoom, id);

    return newRoom as IRoom;
};

const addPhotos = async (conn: mysql.PoolConnection, photos: Array<string>, room_id: number) => {
    const sqlQueryPhotos = `INSERT INTO photo (url, room_id) VALUES (?,?)`;
    for (let photo of photos) {
        const resultHeadersPhoto = await getResultHeaders(conn, sqlQueryPhotos, [photo, room_id]);
        if (resultHeadersPhoto.affectedRows === 0) {
            await conn.rollback();
            await close(conn);
            throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
        }
    }
}

const addAmenities = async (conn: mysql.PoolConnection, amenities: Array<string>, room_id: number) => {
    const sqlQueryAmenity = `INSERT INTO amenity_room (amenity_id, room_id) VALUES (?,?)`;
    for (let amenity of amenities) {
        const sqlQueryAmenityId = `SELECT _id from amenity WHERE name = ?`;
        const currentAmenity = await findOne(conn, sqlQueryAmenityId, amenity);
        const resultHeadersAmenity = await getResultHeaders(conn, sqlQueryAmenity, [currentAmenity._id, room_id]);
        if (resultHeadersAmenity.affectedRows === 0) {
            await conn.rollback();
            await close(conn);
            throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
        }
    }
}

const deleteDataRelatedToRoom = async (conn: mysql.PoolConnection, room_id: number, tableName: string) => {
    const sqlQueryDeletePhotos = `DELETE FROM ${tableName} WHERE room_id = ?`;
    const resultHeadersDeletePhoto = await getResultHeaders(conn, sqlQueryDeletePhotos, [room_id]);
    if (resultHeadersDeletePhoto.affectedRows === 0) {
        await conn.rollback();
        await close(conn);
        throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
    }
}

const createQueryInsert = (tableName: string, fields: Tables[], data: data) => {
    let query = `INSERT INTO ${tableName} (`;
    let valuesQuery = ' values (';
    const values: any[] = [];

    for (let i = 0; i < fields.length; i++) {
        const key = fields[i].name as keyof data;
        if (i !== (fields.length - 1)) {
            query += `${fields[i].name}, `;
            valuesQuery += '?,'
        } else {
            query += `${fields[i].name})`;
            valuesQuery += '?);'
        }
        values.push(data[key]);
    }
    const sqlQuery = query + valuesQuery;
    return { sqlQuery, values };
}

const createQueryUpdate = (tableName: string, fields: Tables[], data: data) => {
    let query = `UPDATE ${tableName} SET `;
    const values: any[] = [];
    for (let i = 0; i < fields.length; i++) {
        const key = fields[i].name as keyof data;
        if (i !== (fields.length - 1)) {
            query += `${fields[i].name} = ?, `;
        } else {
            query += `${fields[i].name} = ?`;
        }
        values.push(data[key]);
    }
    const sqlQuery = query + ' WHERE _id = ?';
    return { sqlQuery, values };
}

const findEditedAddedOne = async (conn: mysql.PoolConnection, tableName: string, id: any) => {
    const query = `SELECT * FROM ${tableName} WHERE _id = ?`;
    const preparedStatement = await conn.prepare(query);
    const result = await preparedStatement.execute([id]) as RowDataPacket;
    const res = result[0] as data;
    preparedStatement.close();
    conn.unprepare(query);
    return res;
}

const getResultHeaders = async (conn: mysql.PoolConnection, sqlQuery: string, values: any[]) => {
    const preparedStatement = await conn.prepare(sqlQuery);
    const [result] = await preparedStatement.execute(values);
    const resultHeaders = result as ResultSetHeader;
    clearPreparedStatements(conn, preparedStatement, sqlQuery);
    return resultHeaders;
}

const clearPreparedStatements = (conn: mysql.PoolConnection, preparedStatement: PreparedStatementInfo, sqlQuery: string) => {
    preparedStatement.close();
    conn.unprepare(sqlQuery);
}