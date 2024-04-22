import dotenv from "dotenv";
import { close, connection } from "./connection";
import mysql from 'mysql2/promise';
import { Tables } from "../interfaces/Tables";

dotenv.config();



const createTable = async (conn: mysql.PoolConnection, tableName: string) => {
    try {
        conn.execute(`CREATE TABLE ${tableName} (id NOT NULL AUTO_INCREMENT, PRIMARY KEY (id))`);
    } catch (error) {
        console.error(error);
    }
}

const createFields = async (conn: mysql.PoolConnection, tableName: string, fields: Tables[]) => {
    try {
        for(let i = 0; i < fields.length; i++) {
            conn.execute(`ALTER TABLE ${tableName} MODIFY ${fields[i].name} ${fields[i].type}`);
        }
        
    } catch (error) {
        console.error(error);
    }
}

const main = async () => {
    const conn = await connection();
    try {
        
        
        
    } catch (error) {
        close(conn);
        console.error(error);
    } finally {
        close(conn);
    }
}

main();