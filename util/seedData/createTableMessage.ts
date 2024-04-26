import { faker } from "@faker-js/faker";
import { Tables } from "../../interfaces/Tables";
import { tableMessage } from "../constants";
import { createTable, deleteTable, insertValues } from "../createDatabase";
import mysql from 'mysql2/promise';
import { queryInsertIntoMessage } from "../queries";

export const MessageTable: Tables[] = [
    { name: 'full_name', type: 'varchar(255)', setValue: () => faker.person.fullName() },
    { name: 'email', type: 'varchar(255)', setValue: () => faker.internet.email() },
    { name: 'phone', type: 'varchar(255)', setValue: () => faker.phone.number() },
    { name: 'subject', type: 'varchar(255)', setValue: () => faker.lorem.sentences({min: 1, max: 2}) },
    { name: 'messages', type: 'varchar(3000)', setValue: () => faker.lorem.sentences({min: 1, max: 3}) },
    { name: 'date', type: 'varchar(255)', setValue: () => faker.date.recent().getTime() },
    { name: 'is_read', type: 'boolean', setValue: () => faker.helpers.arrayElement([true, false]) },
    { name: 'archived', type: 'boolean', setValue: () => faker.helpers.arrayElement([true, false]) },
    { name: 'photo', type: 'varchar(255)', setValue: () => faker.image.avatarGitHub()},
    { name: 'time_passed', type: 'varchar(255)', setValue: () => '4 mins ago' },
];

export const createTableMessage = (conn: mysql.PoolConnection) => {
    createTable(conn, tableMessage, MessageTable);
}

export const dropTableMessage = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableMessage);
}

export const insertValuesMessage = async (conn: mysql.PoolConnection, rows: number) => {
    await insertValues(conn, queryInsertIntoMessage, MessageTable, rows);
}