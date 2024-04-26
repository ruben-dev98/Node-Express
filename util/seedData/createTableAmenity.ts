import { Tables } from "../../interfaces/Tables";
import { amenities, tableAmenity } from "../constants";
import { createTable, deleteTable } from "../createDatabase";
import mysql from 'mysql2/promise';
import { queryInsertIntoAmenity } from "../queries";


export const AmenityTable: Tables[] = [
    {name: 'name', type: 'varchar(255)', setValue: (i) => amenities[i || 0]}
];

export const createTableAmenity = (conn: mysql.PoolConnection) => {
    createTable(conn, tableAmenity, AmenityTable);
}

export const dropTableAmenity = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableAmenity);
}

export const insertValuesAmenity = async (conn: mysql.PoolConnection, rows: number) => {
    let sqlQuery = queryInsertIntoAmenity;
    const preparedStatement = await conn.prepare(sqlQuery);
    for(let i = 0; i < rows; i++) {
        preparedStatement.execute([AmenityTable[0].setValue(i)]);
    }
    preparedStatement.close();
    conn.unprepare(sqlQuery);
}