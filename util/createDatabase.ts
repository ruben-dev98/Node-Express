
import mysql from 'mysql2/promise';
import { Tables } from '../interfaces/Tables';

export const createTable = async (conn: mysql.PoolConnection, tableName: string) => {
    await conn.execute(`DROP TABLE IF EXISTS ${tableName};`)
    await conn.execute(`CREATE TABLE ${tableName} (id int NOT NULL AUTO_INCREMENT, PRIMARY KEY (id) );`);
    await conn.commit();
}

export const createFields = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[]) => {
    for(let i = 0; i < fields.length; i++) {
        await conn.execute(`ALTER TABLE ${tableName} MODIFY ${fields[i].name} ${fields[i].type} ${fields[i].foreign ? fields[i].foreign : ''};`);
    }
}