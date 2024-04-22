import { Tables } from "../../interfaces/Tables";
import { tableAmenity } from "../constants";
import { createTable, deleteTable } from "../createDatabase";
import mysql from 'mysql2/promise';

const amenities: string[] = ['Breakfast', 'Smart Security', 'Strong Locker', 'Shower', '24/7 Online Support', 'Kitchen', 'Cleaning', 'Expert Team', 'High Speed Wifi', 'Air Conditioner', 'Towels', 'Grocery', 'Single Bed', 'Shop Near'];

export const AmenityTable: Tables[] = [
    {name: 'name', type: 'varchar(255)', fakerType: (i) => amenities[i || 0]}
];

export const createTableAmenity = (conn: mysql.PoolConnection) => {
    createTable(conn, tableAmenity, AmenityTable);
}

export const dropTableAmenity = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableAmenity);
}

export const insertValuesAmenity = async (conn: mysql.PoolConnection, rows: number) => {
    let sqlQuery = `INSERT INTO ${tableAmenity} (name) values `;
    for(let i = 0; i < rows; i++) {
        if(i !== (rows - 1)) {
            sqlQuery += `("${AmenityTable[0].fakerType(i)}"), \n`
        } else {
            sqlQuery += `("${AmenityTable[0].fakerType(i)}"); \n`
        }
    }
    await conn.execute(sqlQuery);
}