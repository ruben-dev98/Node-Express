import { Tables } from "../../interfaces/Tables";
import { tableAmenity } from "../constants";
import { createFields, createTable } from "../createDatabase";
import mysql from 'mysql2/promise';

export const AmenityTable: Tables[] = [
    {name: 'name', type: 'varchar(255)'}
];

export const createTableAmenity = (conn: mysql.PoolConnection) => {
    createTable(conn, tableAmenity);
    createFields(conn, tableAmenity, AmenityTable);
}