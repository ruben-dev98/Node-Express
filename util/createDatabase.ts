
import mysql from 'mysql2/promise';
import { Tables } from '../interfaces/Tables';

const createQueryCreate = (tableName: string, fields: Tables[]) => {
    let query = `CREATE TABLE ${tableName} (_id INT UNSIGNED NOT NULL AUTO_INCREMENT, `;
    let primaryKeyDeclaration = ' PRIMARY KEY (_id));';
    for(let i = 0; i < fields.length; i++) {
        query += (`${fields[i].name} ${fields[i].type}, ${fields[i].foreign ? fields[i].foreign + ',' : ''}`);
    }
    query += primaryKeyDeclaration;
    return query;
}

const createQueryInsert = (tableName: string, fields: Tables[], rows: number) => {
    let query = `INSERT INTO ${tableName} (`;
    let values = ' values ';
    for(let i = 0; i < fields.length; i++) {
        if(i !== (fields.length - 1)) {
            query += `${fields[i].name}, `;
        } else {
            query += `${fields[i].name})`;
        }
    }

    for(let i = 0; i < rows; i++) {
        values += '('
        for(let j = 0; j < fields.length; j++) {
            if(fields[j].type.includes('varchar') && j !== (fields.length - 1)) {
                values += `"${fields[j].fakerType()}", `;
            } else if(!fields[j].type.includes('varchar') && j !== (fields.length - 1)) {
                values += `${fields[j].fakerType()}, `;
            } else if(fields[j].type.includes('varchar') && j === (fields.length - 1)) {
                values += `"${fields[j].fakerType()}" `;
            } else {
                values += `${fields[j].fakerType()}`;
            }
        }
        if(i !== (rows - 1)) {
            values += '),';
        } else {
            values += ');';
        }
    }
    
    return {query, values};
}

export const createTable = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[]) => {
    const sqlQuery = createQueryCreate(tableName, fields);
    await conn.execute(sqlQuery);
}

export const deleteTable = async (conn: mysql.PoolConnection, tableName: string) => {
    await conn.execute(`DROP TABLE IF EXISTS ${tableName}`);
}

export const insertValues = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[], rows: number) => {
    let {query, values} = createQueryInsert(tableName, fields, rows);
    const sqlQuery = query + values;
    await conn.query(sqlQuery);
}