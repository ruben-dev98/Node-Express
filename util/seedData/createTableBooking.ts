import { faker } from "@faker-js/faker";
import { Tables } from "../../interfaces/Tables";
import { bookingStatus, tableBooking } from "../constants";
import { createTable, deleteTable, insertValues } from "../createDatabase";
import mysql from 'mysql2/promise';
import { queryInsertIntoBooking } from "../queries";

export const BookingTable: Tables[] = [
    { name: 'full_name', type: 'varchar(255)' , setValue: () => faker.person.fullName()},
    { name: 'order_date', type: 'datetime', setValue: () => faker.date.recent() },
    { name: 'check_in', type: 'datetime', setValue: () => faker.date.past() },
    { name: 'check_out', type: 'datetime', setValue: () => faker.date.recent() },
    { name: 'special_request', type: 'varchar(3000)', setValue: () => faker.lorem.sentences({min: 1, max: 3}) },
    { name: 'status', type: 'varchar(255)', setValue: () => faker.helpers.arrayElement(bookingStatus) },
    { name: 'discount', type: 'int', setValue: () =>  faker.number.int({min: 0, max: 50}) },
    { name: 'phone', type: 'varchar(255)', setValue: () => faker.phone.number() },
    { name: 'email', type: 'varchar(255)', setValue: () => faker.internet.email() },
    { name: 'room_id', type: 'INT UNSIGNED NOT NULL', foreign: 'FOREIGN KEY (room_id) REFERENCES room(_id) ON DELETE CASCADE', setValue: () => faker.number.int({min: 1, max: 10}) }
];

export const createTableBooking = (conn: mysql.PoolConnection) => {
    createTable(conn, tableBooking, BookingTable);
}

export const dropTableBooking = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableBooking);
}

export const insertValuesBooking = async (conn: mysql.PoolConnection, rows: number) => {
    await insertValues(conn, queryInsertIntoBooking, BookingTable, rows);
}