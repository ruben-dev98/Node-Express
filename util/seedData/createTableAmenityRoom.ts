import { faker } from "@faker-js/faker";
import { Tables } from "../../interfaces/Tables";
import { tableAmenityRoom } from "../constants";
import { createTable, deleteTable, insertValues } from "../createDatabase";
import mysql from 'mysql2/promise';
import { queryInsertIntoAmenityRoom } from "../queries";

export const AmenityRoomsTable: Tables[] = [
    {name: 'room_id', type: 'INT UNSIGNED NOT NULL', foreign: 'FOREIGN KEY (room_id) REFERENCES room(_id) ON DELETE CASCADE', fakerType: () => faker.number.int({min: 1, max: 10})},
    {name: 'amenity_id', type: 'INT UNSIGNED NOT NULL', foreign: 'FOREIGN KEY (amenity_id) REFERENCES amenity(_id) ON DELETE CASCADE', fakerType: () => faker.number.int({min: 1, max: 14})},
];

export const createTableAmenityRoom = (conn: mysql.PoolConnection) => {
    createTable(conn, tableAmenityRoom, AmenityRoomsTable);
}

export const dropTableAmenityRoom = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableAmenityRoom);
}

export const insertValuesAmenityRoom = async (conn: mysql.PoolConnection, rows: number) => {
    await insertValues(conn, queryInsertIntoAmenityRoom, AmenityRoomsTable, rows);
}