import { IEmployee } from '../interfaces/Employee';
import { connection } from '../util/connection';
import { findOne } from '../util/mySqlQueries';
import { queryOneEmployeeByEmail } from '../util/queries';

export const getUserByEmail = async (email: string) => {
    const conn = await connection();
    const employee = await findOne(conn, queryOneEmployeeByEmail, email);
    return employee as IEmployee;
}