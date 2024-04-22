import { Tables } from "../../interfaces/Tables";
import { tablePhoto } from "../constants";
import { createTable, deleteTable } from "../createDatabase";
import mysql from 'mysql2/promise';

export const PhotoTable: Tables[] = [
    {name: 'url', type: 'varchar(500)'},
    {name: 'room_id', type: 'int NOT NULL', foreign: 'FOREIGN KEY (room_id) REFERENCES room(id)'}
];

export const createTablePhoto = (conn: mysql.PoolConnection) => {
    createTable(conn, tablePhoto, PhotoTable);
}

export const dropTablePhoto = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tablePhoto);
}