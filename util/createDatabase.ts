
import mysql from 'mysql2/promise';
import { Tables } from '../interfaces/Tables';
import dotenv from 'dotenv';

dotenv.config();

export const createTable = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[]) => {
    const sqlQuery = createQuery(tableName, fields);
    await conn.execute(sqlQuery);
}

export const createQuery = (tableName: string, fields: Tables[]) => {
    let query = `CREATE TABLE ${tableName} (id int NOT NULL AUTO_INCREMENT, `;
    let primaryKeyDeclaration = ' PRIMARY KEY (id));';
    for(let i = 0; i < fields.length; i++) {
        query += (`${fields[i].name} ${fields[i].type}, ${fields[i].foreign ? fields[i].foreign + ',' : ''}`);
    }
    query += primaryKeyDeclaration;
    return query;
}

export const deleteTable = async (conn: mysql.PoolConnection, tableName: string) => {
    await conn.execute(`DROP TABLE IF EXISTS ${tableName}`);
}