import { faker } from "@faker-js/faker";
import { Tables } from "../../interfaces/Tables";
import { bookingStatus, tableBooking } from "../constants";
import { createTable, deleteTable, insertValues } from "../createDatabase";
import mysql from 'mysql2/promise';

export const BookingTable: Tables[] = [
    { name: 'full_name', type: 'varchar(255)' , fakerType: () => faker.person.fullName()},
    { name: 'order_date', type: 'varchar(255)', fakerType: () => faker.date.recent().getTime() },
    { name: 'check_in', type: 'varchar(255)', fakerType: () => faker.date.past().getTime() },
    { name: 'check_out', type: 'varchar(255)', fakerType: () => faker.date.recent().getTime() },
    { name: 'special_request', type: 'varchar(3000)', fakerType: () => faker.lorem.sentences({min: 1, max: 3}) },
    { name: 'status', type: 'varchar(255)', fakerType: () => faker.helpers.arrayElement(bookingStatus) },
    { name: 'discount', type: 'int', fakerType: () =>  faker.number.int({min: 0, max: 50}) },
    { name: 'phone', type: 'varchar(255)', fakerType: () => faker.phone.number() },
    { name: 'email', type: 'varchar(255)', fakerType: () => faker.internet.email() },
    { name: 'room_id', type: 'int NOT NULL', foreign: 'FOREIGN KEY (room_id) REFERENCES room(_id) ON DELETE CASCADE', fakerType: () => faker.number.int({min: 1, max: 10}) }
];

export const createTableBooking = (conn: mysql.PoolConnection) => {
    createTable(conn, tableBooking, BookingTable);
}

export const dropTableBooking = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableBooking);
}

export const insertValuesBooking = (conn: mysql.PoolConnection, rows: number) => {
    insertValues(conn, tableBooking, BookingTable, rows);
}