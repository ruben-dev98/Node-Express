import { faker } from "@faker-js/faker";
import { Tables } from "../../interfaces/Tables";
import { tablePhoto } from "../constants";
import { createTable, deleteTable, insertValues } from "../createDatabase";
import mysql from 'mysql2/promise';
import { queryInsertIntoPhoto } from "../queries";

export const PhotoTable: Tables[] = [
    {name: 'url', type: 'varchar(500)', setValue: () => faker.image.avatarGitHub()},
    {name: 'room_id', type: 'INT UNSIGNED NOT NULL', foreign: 'FOREIGN KEY (room_id) REFERENCES room(_id) ON DELETE CASCADE', setValue: () => faker.number.int({min: 1, max: 10})}
];

export const createTablePhoto = (conn: mysql.PoolConnection) => {
    createTable(conn, tablePhoto, PhotoTable);
}

export const dropTablePhoto = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tablePhoto);
}

export const insertValuesPhoto = async (conn: mysql.PoolConnection, rows: number) => {
    await insertValues(conn, queryInsertIntoPhoto, PhotoTable, rows);
}