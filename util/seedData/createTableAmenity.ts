import { faker } from "@faker-js/faker";
import { Tables } from "../../interfaces/Tables";
import { tableAmenity } from "../constants";
import { createTable, deleteTable, insertValues } from "../createDatabase";
import mysql from 'mysql2/promise';

export const AmenityTable: Tables[] = [
    {name: 'name', type: 'varchar(255)', fakerType: () => faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Double Superior', 'Suite'])}
];

export const createTableAmenity = (conn: mysql.PoolConnection) => {
    createTable(conn, tableAmenity, AmenityTable);
}

export const dropTableAmenity = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableAmenity);
}

export const insertValuesAmenity = (conn: mysql.PoolConnection, rows: number) => {
    insertValues(conn, tableAmenity, AmenityTable, rows);
}