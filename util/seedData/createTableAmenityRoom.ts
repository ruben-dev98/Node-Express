import { Tables } from "../../interfaces/Tables";
import { tableAmenityRoom } from "../constants";
import { createTable, deleteTable } from "../createDatabase";
import mysql from 'mysql2/promise';

export const AmenityRoomsTable: Tables[] = [
    {name: 'room_id', type: 'int NOT NULL', foreign: 'FOREIGN KEY (room_id) REFERENCES room(id)'},
    {name: 'amenity_id', type: 'int NOT NULL', foreign: 'FOREIGN KEY (amenity_id) REFERENCES amenity(id)'},
];

export const createTableAmenityRoom = (conn: mysql.PoolConnection) => {
    createTable(conn, tableAmenityRoom, AmenityRoomsTable);
}

export const dropTableAmenityRoom = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableAmenityRoom);
}