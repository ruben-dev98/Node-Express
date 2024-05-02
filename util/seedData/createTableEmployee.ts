import { faker } from "@faker-js/faker";
import { Tables } from "../../interfaces/Tables";
import { employeeJobs, tableEmployee } from "../constants";
import { createTable, deleteTable, insertValues } from "../createDatabase";
import mysql from 'mysql2/promise';
import { hashPassword } from "../cryptPassword";
import { queryInsertIntoEmployee } from "../queries";

export const EmployeeTable: Tables[] = [
    { name: 'photo', type: 'varchar(255)', setValue: () => faker.image.avatarGitHub()},
    { name: 'full_name', type: 'varchar(255)', setValue: () => faker.person.fullName() },
    { name: 'email', type: 'varchar(255)', setValue: () => faker.internet.email() },
    { name: 'start_date', type: 'datetime', setValue: () => new Date(Date.now()) },
    { name: 'description', type: 'varchar(255)', setValue: () => faker.lorem.sentences({min: 1, max: 3}) },
    { name: 'job', type: 'varchar(255)', setValue: () => faker.helpers.arrayElement(employeeJobs) },
    { name: 'contact', type: 'varchar(255)', setValue: () => faker.phone.number() },
    { name: 'status', type: 'varchar(255)', setValue: () => faker.helpers.arrayElement([true, false]) },
    { name: 'password', type: 'varchar(255)', setValue: () => hashPassword('admin') },
];

export const createTableEmployee = (conn: mysql.PoolConnection) => {
    createTable(conn, tableEmployee, EmployeeTable);
}

export const dropTableEmployee = (conn: mysql.PoolConnection) => {
    deleteTable(conn, tableEmployee);
}

export const insertValuesEmployee = async (conn: mysql.PoolConnection, rows: number) => {
    await insertValues(conn, queryInsertIntoEmployee, EmployeeTable, rows);
}