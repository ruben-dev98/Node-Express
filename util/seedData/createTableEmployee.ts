import { Tables } from "../../interfaces/Tables";
import { tableEmployee } from "../constants";
import { createFields, createTable } from "../createDatabase";
import mysql from 'mysql2/promise';

export const EmployeeTable: Tables[] = [
    { name: 'photo', type: 'varchar(255)' },
    { name: 'full_name', type: 'varchar(255)' },
    { name: 'email', type: 'varchar(255)' },
    { name: 'start_date', type: 'varchar(255)' },
    { name: 'description', type: 'varchar(255)' },
    { name: 'job', type: 'varchar(255)' },
    { name: 'contact', type: 'int' },
    { name: 'status', type: 'varchar(255)' },
    { name: 'password', type: 'varchar(255)' },
];

export const createTableEmployee = (conn: mysql.PoolConnection) => {
    createTable(conn, tableEmployee);
    createFields(conn, tableEmployee, EmployeeTable);
}