import { IEmployee } from '../interfaces/Employee';
import { connection } from '../util/connection';
import { tableEmployee } from '../util/constants';
import { findOne } from '../util/mySqlQueries';

export const getUserByEmail = async (email: string) => {
    const conn = await connection();
    const sqlQuery = `SELECT * FROM ${tableEmployee} WHERE email = ?`;
    const employee = await findOne(conn, sqlQuery, email);
    return employee as IEmployee;
}