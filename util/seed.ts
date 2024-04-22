import { close, connection } from "./connection";
import { createTableAmenity, dropTableAmenity } from "./seedData/createTableAmenity";
import { createTableAmenityRoom, dropTableAmenityRoom } from "./seedData/createTableAmenityRoom";
import { createTableBooking, dropTableBooking } from "./seedData/createTableBooking";
import { createTableRoom, dropTableRoom } from "./seedData/createTableRoom";
import { createTableEmployee, dropTableEmployee } from "./seedData/createTableEmployee";
import { createTableMessage, dropTableMessage } from "./seedData/createTableMessage";
import { createTablePhoto, dropTablePhoto } from "./seedData/createTablePhoto";
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

const main = async () => {
    const conn = await connection();
    try {
        await dropTables(conn);
        await createTables(conn);
        await close(conn);
        exit(1);
    } catch (error) {
        await conn.rollback();
        await close(conn);
        console.error(error);
    }
}

main();