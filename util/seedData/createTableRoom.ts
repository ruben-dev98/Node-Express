import { Tables } from "../../interfaces/Tables";
import { tableRoom } from "../constants";
import { createTable, deleteTable } from "../createDatabase";
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
    createTable(conn, tableRoom, RoomTable);
}

export const dropTableRoom = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableRoom);
}