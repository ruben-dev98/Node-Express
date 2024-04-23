
import mysql, { ResultSetHeader } from 'mysql2/promise';
import { Tables } from '../interfaces/Tables';
import { IBooking } from '../interfaces/Booking';
import { IMessage } from '../interfaces/Message';
import { IRoom } from '../interfaces/Room';
import { IEmployee } from '../interfaces/Employee';

type data = IBooking | IMessage | IRoom | IEmployee;

export const find = async (conn: mysql.PoolConnection, tableName: string) => {
    const sqlQuery = `SELECT * FROM ${tableName}`;
    const [results] = await conn.execute(sqlQuery);
    return results;
}

export const findOne = async (conn: mysql.PoolConnection, tableName: string, id: number) => {
    const sqlQuery = `SELECT * FROM ${tableName} where id = ?`;
    const preparedStatement = await conn.prepare(sqlQuery);
    const [result] = await preparedStatement.execute([id]);
    preparedStatement.close();
    conn.unprepare(sqlQuery);
    return result;
}

export const addData = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[], data: data) => {
    const {sqlQuery, values} = createQueryInsert(tableName, fields, data);
    const resultHeaders = await getResultHeaders(conn, sqlQuery, values);
    const insertedId: number = resultHeaders.insertId;
    const newData = await findEditedAddedOne(conn, tableName, insertedId);
    return {resultHeaders, newData};
}

export const editData = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[], data: data, id: number) => {
    const {sqlQuery, values} = createQueryUpdate(tableName, fields, data);
    values.push(id);
    const resultHeaders = await getResultHeaders(conn, sqlQuery, values);
    const newData = await findEditedAddedOne(conn, tableName, id);
    return {resultHeaders, newData};
}

export const deleteData = async (conn: mysql.PoolConnection, tableName: string, id: number) => {
    const sqlQuery = `DELETE FROM ${tableName} WHERE id = ?`;
    const resultHeaders = await getResultHeaders(conn, sqlQuery, [id]);
    return resultHeaders;
}

const createQueryInsert = (tableName: string, fields: Tables[], data: data) => {
    let query = `INSERT INTO ${tableName} (`;
    let valuesQuery = ' values (';
    const values: any[] = [];

    for(let i = 0; i < fields.length; i++) {
        const key = fields[i].name as keyof data;
        if(i !== (fields.length - 1)) {
            query += `${fields[i].name}, `;
            valuesQuery += '?,'
        } else {
            query += `${fields[i].name})`;
            valuesQuery += '?);'
        }
        values.push(data[key]);
    }
    const sqlQuery = query + valuesQuery;
    return {sqlQuery, values};
}

const createQueryUpdate = (tableName: string, fields: Tables[], data: data) => {
    let query = `UPDATE ${tableName} SET `;
    const values: any[] = [];
    for(let i = 0; i < fields.length; i++) {
        const key = fields[i].name as keyof data;
        if(i !== (fields.length - 1)) {
            query += `${fields[i].name} = ?, `;
        } else {
            query += `${fields[i].name} = ?`;
        }
        values.push(data[key]);
    }
    const sqlQuery = query + ' WHERE id = ?';
    return {sqlQuery, values};
}

const findEditedAddedOne = async (conn: mysql.PoolConnection, tableName: string, id: any) => {
    const query = `SELECT * FROM ${tableName} WHERE id = ?`;
    const preparedStatement = await conn.prepare(query);
    const [result] = await preparedStatement.execute([id]);
    preparedStatement.close();
    conn.unprepare(query);
    return result;
}

const getResultHeaders = async (conn: mysql.PoolConnection, sqlQuery: string, values: any[]) => {
    const preparedStatement = await conn.prepare(sqlQuery);
    const [result] = await preparedStatement.execute(values);
    const resultHeaders = result as ResultSetHeader;
    preparedStatement.close();
    conn.unprepare(sqlQuery);
    return resultHeaders;
}