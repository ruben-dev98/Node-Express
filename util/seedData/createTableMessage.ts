import { faker } from "@faker-js/faker";
import { Tables } from "../../interfaces/Tables";
import { tableMessage } from "../constants";
import { createTable, deleteTable, insertValues } from "../createDatabase";
import mysql from 'mysql2/promise';

export const MessageTable: Tables[] = [
    { name: 'full_name', type: 'varchar(255)', fakerType: () => faker.person.fullName() },
    { name: 'email', type: 'varchar(255)', fakerType: () => faker.internet.email() },
    { name: 'phone', type: 'varchar(255)', fakerType: () => faker.phone.number() },
    { name: 'subject', type: 'varchar(255)', fakerType: () => faker.lorem.sentences({min: 1, max: 2}) },
    { name: 'messages', type: 'varchar(3000)', fakerType: () => faker.lorem.sentences({min: 1, max: 3}) },
    { name: 'date', type: 'varchar(255)', fakerType: () => faker.date.recent().getTime() },
    { name: 'isRead', type: 'boolean', fakerType: () => faker.helpers.arrayElement([true, false]) },
    { name: 'archived', type: 'boolean', fakerType: () => faker.helpers.arrayElement([true, false]) },
    { name: 'photo', type: 'varchar(255)', fakerType: () => faker.image.avatarGitHub()},
    { name: 'time_passed', type: 'varchar(255)', fakerType: () => '4 mins ago' },
];

export const createTableMessage = (conn: mysql.PoolConnection) => {
    createTable(conn, tableMessage, MessageTable);
}

export const dropTableMessage = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableMessage);
}

export const insertValuesMessage = (conn: mysql.PoolConnection, rows: number) => {
    insertValues(conn, tableMessage, MessageTable, rows);
}