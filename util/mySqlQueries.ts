
import mysql from 'mysql2/promise';
import { Tables } from '../interfaces/Tables';
import { IBooking } from '../interfaces/Booking';
import { IMessage } from '../interfaces/Message';
import { IRoom } from '../interfaces/Room';

type data = IBooking | IMessage | IRoom | IMessage;

export const find = async (conn: mysql.PoolConnection, tableName: string) => {
    const sqlQuery = `SELECT * FROM ${tableName}`;
    const [results] = await conn.query(sqlQuery);
    return results;
}

export const findOne = async (conn: mysql.PoolConnection, tableName: string, id: number) => {
    const sqlQuery = `SELECT * FROM ${tableName} where id = ?`;
    const result = await conn.query(sqlQuery, [id]);
    return result;
}

export const addData = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[], data: data) => {
    const {sqlQuery, values} = createQueryInsert(tableName, fields, data);
    const result = conn.query(sqlQuery, [values]);
    return result;
}

export const editData = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[], data: data, id: number) => {
    const {sqlQuery, values} = createQueryUpdate(tableName, fields, data);
    values.push(id);
    const result = await conn.execute(sqlQuery, [values]);
    return result;
}

export const deleteData = async (conn: mysql.PoolConnection, tableName: string, id: number) => {
    const sqlQuery = `DELETE FROM ${tableName} WHERE id = ?`;
    const result = await conn.execute(sqlQuery, [id]);
    return result;
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
    const sqlQuery = query + values;
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
    const sqlQuery = query + 'WHERE id = ?';
    return {sqlQuery, values};
}