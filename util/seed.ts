import { close, connection } from "./connection";
import { createTableAmenity, dropTableAmenity, insertValuesAmenity } from "./seedData/createTableAmenity";
import { createTableAmenityRoom, dropTableAmenityRoom, insertValuesAmenityRoom } from "./seedData/createTableAmenityRoom";
import { createTableBooking, dropTableBooking, insertValuesBooking } from "./seedData/createTableBooking";
import { createTableRoom, dropTableRoom, insertValuesRoom } from "./seedData/createTableRoom";
import { createTableEmployee, dropTableEmployee, insertValuesEmployee } from "./seedData/createTableEmployee";
import { createTableMessage, dropTableMessage, insertValuesMessage } from "./seedData/createTableMessage";
import { createTablePhoto, dropTablePhoto, insertValuesPhoto } from "./seedData/createTablePhoto";
import mysql from 'mysql2/promise';
import { exit } from "process";

const dropTables = async (conn: mysql.PoolConnection) => {
    dropTableEmployee(conn);
    dropTableMessage(conn);
    dropTableAmenityRoom(conn);
    dropTableAmenity(conn);
    dropTableBooking(conn);
    dropTablePhoto(conn);
    dropTableRoom(conn);
    await conn.commit();
}

const createTables = async (conn: mysql.PoolConnection) => {
    createTableAmenity(conn);
    createTableRoom(conn);
    createTableEmployee(conn);
    createTableMessage(conn);
    createTableBooking(conn);
    createTablePhoto(conn);
    createTableAmenityRoom(conn);
    await conn.commit();
}

const insertValuesTable = async (conn: mysql.PoolConnection) => {
    await insertValuesAmenity(conn, 14);
    await insertValuesRoom(conn, 10);
    await insertValuesMessage(conn, 10);
    await insertValuesEmployee(conn, 10);
    await insertValuesBooking(conn, 10);
    await insertValuesAmenityRoom(conn, 20);
    await insertValuesPhoto(conn, 20);
    await conn.commit();
}

const main = async () => {
    const conn = await connection();
    try {
        await dropTables(conn);
        await createTables(conn);
        await insertValuesTable(conn);
        await close(conn);
        exit(1);
    } catch (error) {
        await conn.rollback();
        await close(conn);
        console.error(error);
    }
}

main();