import { faker } from "@faker-js/faker";
import { Tables } from "../../interfaces/Tables";
import { roomStatus, roomTypes, tableRoom } from "../constants";
import { createTable, deleteTable, insertValues } from "../createDatabase";
import mysql from 'mysql2/promise';
import { queryInsertIntoRoom } from "../queries";

export const RoomTable: Tables[] = [
    { name: 'type', type: 'varchar(255)', setValue: () => faker.helpers.arrayElement(roomTypes)},
    { name: 'number', type: 'int', setValue: () => faker.number.int({min: 1, max: 100}) },
    { name: 'description', type: 'varchar(3000)', setValue: () => faker.lorem.sentences({min: 1, max: 3})},
    { name: 'offer', type: 'boolean', setValue: () => faker.helpers.arrayElement([true, false])},
    { name: 'price', type: 'int', setValue: () => faker.number.int({min: 20000, max: 100000})},
    { name: 'cancellation', type: 'varchar(3000)', setValue: () => faker.lorem.sentences({min: 1, max: 3})},
    { name: 'discount', type: 'int', setValue: () => faker.number.int({min: 0, max: 100})},
    { name: 'status', type: 'varchar(255)', setValue: () => faker.helpers.arrayElement(roomStatus)}
];

export const createTableRoom = (conn: mysql.PoolConnection) => {
    createTable(conn, tableRoom, RoomTable);
}

export const dropTableRoom = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableRoom);
}

export const insertValuesRoom = async (conn: mysql.PoolConnection, rows: number) => {
    await insertValues(conn, queryInsertIntoRoom, RoomTable, rows);
}