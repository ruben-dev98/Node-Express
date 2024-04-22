import { Tables } from "../../interfaces/Tables";
import { tableAmenityRoom } from "../constants";
import { createFields, createTable } from "../createDatabase";
import mysql from 'mysql2/promise';

export const AmenityRoomsTable: Tables[] = [
    {name: 'room_id', type: 'int NOT NULL', foreign: 'FOREIGN KEY (room_id) REFERENCES room(id)'},
    {name: 'amenities_id', type: 'int NOT NULL', foreign: 'FOREIGN KEY (amenities_id) REFERENCES amenities(id)'},
];

export const createTableAmenityRoom = (conn: mysql.PoolConnection) => {
    createTable(conn, tableAmenityRoom);
    createFields(conn, tableAmenityRoom, AmenityRoomsTable);
}