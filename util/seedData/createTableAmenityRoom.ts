import { faker } from "@faker-js/faker";
import { Tables } from "../../interfaces/Tables";
import { tableAmenityRoom } from "../constants";
import { createTable, deleteTable } from "../createDatabase";
import mysql from 'mysql2/promise';

export const AmenityRoomsTable: Tables[] = [
    {name: 'room_id', type: 'int NOT NULL', foreign: 'FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE', fakerType: () => faker.number.int({min: 1, max: 10})},
    {name: 'amenity_id', type: 'int NOT NULL', foreign: 'FOREIGN KEY (amenity_id) REFERENCES amenity(id) ON DELETE CASCADE', fakerType: () => faker.number.int({min: 1, max: 14})},
];

export const createTableAmenityRoom = (conn: mysql.PoolConnection) => {
    createTable(conn, tableAmenityRoom, AmenityRoomsTable);
}

export const dropTableAmenityRoom = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableAmenityRoom);
}