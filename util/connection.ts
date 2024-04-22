import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD
});

export async function connection() {
    return await pool.getConnection();
}

export async function close(conn: mysql.PoolConnection) {
    return await pool.releaseConnection(conn);
}