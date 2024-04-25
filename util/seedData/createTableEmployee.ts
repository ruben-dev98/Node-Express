import { faker } from "@faker-js/faker";
import { Tables } from "../../interfaces/Tables";
import { employeeJobs, tableEmployee } from "../constants";
import { createTable, deleteTable, insertValues } from "../createDatabase";
import mysql from 'mysql2/promise';
import { hashPassword } from "../cryptPassword";
import { queryInsertIntoEmployee } from "../queries";

export const EmployeeTable: Tables[] = [
    { name: 'photo', type: 'varchar(255)', fakerType: () => faker.image.avatarGitHub()},
    { name: 'full_name', type: 'varchar(255)', fakerType: () => faker.person.fullName() },
    { name: 'email', type: 'varchar(255)', fakerType: () => faker.internet.email() },
    { name: 'start_date', type: 'varchar(255)', fakerType: () => Date.now() },
    { name: 'description', type: 'varchar(255)', fakerType: () => faker.lorem.sentences({min: 1, max: 3}) },
    { name: 'job', type: 'varchar(255)', fakerType: () => faker.helpers.arrayElement(employeeJobs) },
    { name: 'contact', type: 'varchar(255)', fakerType: () => faker.phone.number() },
    { name: 'status', type: 'varchar(255)', fakerType: () => faker.helpers.arrayElement([true, false]) },
    { name: 'password', type: 'varchar(255)', fakerType: () => hashPassword('admin') },
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