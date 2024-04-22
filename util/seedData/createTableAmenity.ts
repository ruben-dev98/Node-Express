import { Tables } from "../../interfaces/Tables";
import { tableAmenity } from "../constants";
import { createTable, deleteTable } from "../createDatabase";
import mysql from 'mysql2/promise';

export const AmenityTable: Tables[] = [
    {name: 'name', type: 'varchar(255)'}
];

export const createTableAmenity = (conn: mysql.PoolConnection) => {
    createTable(conn, tableAmenity, AmenityTable);
}

export const dropTableAmenity = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableAmenity);
}