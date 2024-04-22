import { faker } from "@faker-js/faker";
import { Tables } from "../../interfaces/Tables";
import { tablePhoto } from "../constants";
import { createTable, deleteTable } from "../createDatabase";
import mysql from 'mysql2/promise';

export const PhotoTable: Tables[] = [
    {name: 'url', type: 'varchar(500)', fakerType: () => ''},
    {name: 'room_id', type: 'int NOT NULL', foreign: 'FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE', fakerType: () => faker.number.int({min: 1, max: 10})}
];

export const createTablePhoto = (conn: mysql.PoolConnection) => {
    createTable(conn, tablePhoto, PhotoTable);
}

export const dropTablePhoto = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tablePhoto);
}