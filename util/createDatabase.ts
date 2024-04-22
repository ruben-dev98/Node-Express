
import mysql from 'mysql2/promise';
import { Tables } from '../interfaces/Tables';

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

export const createQueryInsert = (tableName: string, fields: Tables[], rows: number) => {
    let query = `INSERT INTO ${tableName} (`;
    let values = '(';
    for(let i = 0; i < fields.length; i++) {
        query += `${fields[i].name}, `;
        for(let j = 0; j < rows; j++) {
            if(fields[i].type.includes('varchar')) {
                values += `"${fields[i].fakerType()}", `;
            } else {
                values += `${fields[i].fakerType()}, `;
            }
        }
    }
    values += ');'
    query += ') values ';
    return {query, values};
}

export const deleteTable = async (conn: mysql.PoolConnection, tableName: string) => {
    await conn.execute(`DROP TABLE IF EXISTS ${tableName}`);
}

export const insertValues = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[], rows: number) => {
    let {query, values} = createQueryInsert(tableName, fields, rows);
    const sqlQuery = query + values;
    await conn.query(sqlQuery);
}