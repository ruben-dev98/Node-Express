
import mysql from 'mysql2/promise';
import { Tables } from '../interfaces/Tables';
import dotenv from 'dotenv';

dotenv.config();

export const createTable = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[]) => {
    const sqlQuery = createQueryCreate(tableName, fields);
    await conn.execute(sqlQuery);
}

export const createQueryCreate = (tableName: string, fields: Tables[]) => {
    let query = `CREATE TABLE ${tableName} (id int NOT NULL AUTO_INCREMENT, `;
    let primaryKeyDeclaration = ' PRIMARY KEY (id));';
    for(let i = 0; i < fields.length; i++) {
        query += (`${fields[i].name} ${fields[i].type}, ${fields[i].foreign ? fields[i].foreign + ',' : ''}`);
    }
    query += primaryKeyDeclaration;
    return query;
}

export const createQueryInsert = (tableName: string, fields: Tables[]) => {
    let query = `INSERT INTO ${tableName} (`;
    let values = ') values (';
    for(let i = 0; i < fields.length; i++) {
        query += `${fields[i].name}, `;
        values += `${fields[i].fakerType()}`
    }
    values += ');'
    query += values;
    return query;
}

export const deleteTable = async (conn: mysql.PoolConnection, tableName: string) => {
    await conn.execute(`DROP TABLE IF EXISTS ${tableName}`);
}

export const insertValues = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[], rows: number) => {
    let sqlQuery = createQueryInsert(tableName, fields);
    for(let i = 0; i < rows; i++) {
        await conn.execute(sqlQuery);
    }
}