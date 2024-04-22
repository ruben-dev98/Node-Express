import { Tables } from "../../interfaces/Tables";
import { tableRoom } from "../constants";
import { createFields, createTable } from "../createDatabase";
import mysql from 'mysql2/promise';

export const RoomTable: Tables[] = [
    { name: 'type', type: 'varchar(255)' },
    { name: 'number', type: 'int' },
    { name: 'description', type: 'varchar(3000)' },
    { name: 'offer', type: 'boolean' },
    { name: 'price', type: 'int' },
    { name: 'cancellation', type: 'varchar(3000)' },
    { name: 'discount', type: 'int' },
    { name: 'status', type: 'varchar(3000)' }
];

export const createTableRoom = (conn: mysql.PoolConnection) => {
    createTable(conn, tableRoom);
    createFields(conn, tableRoom, RoomTable);
}