import { ApiError } from "../class/ApiError";
import { IEmployee } from "../interfaces/Employee";
import { comparePassword } from "../util/cryptPassword";
import { dataNotFoundError, statusCodeErrorNotFound, tableEmployee } from "../util/constants";
import { close, connection } from "../util/connection";
import { addData, deleteData, editData, find, findOne } from "../util/mySqlQueries";
import { validateEmployee } from "../validators/employeeValidator";
import { queryDeleteEmployee, queryInsertIntoEmployee, queryOneEmployee, queryUpdateEmployee } from "../util/queries";

export const getAllEmployees = async (): Promise<IEmployee[]>  =>  {
    const conn = await connection();
    const sqlQuery = `SELECT * FROM ${tableEmployee}`;
    const result = await find(conn, sqlQuery) as IEmployee[];
    close(conn);
    return result;
}

export const getOneEmployee = async (id: any): Promise<IEmployee> => {
    const conn = await connection();
    const sqlQuery = `SELECT * FROM ${tableEmployee} WHERE _id = ?`;
    const result = await findOne(conn, sqlQuery, id);
    close(conn);
    return result as IEmployee;
}

export const addEmployee = async (data: IEmployee): Promise<IEmployee> => {
    const conn = await connection();
    const newEmployee = validateEmployee(data);
    const newData = await addData(conn, queryInsertIntoEmployee, queryOneEmployee, newEmployee);
    close(conn);
    return newData as IEmployee;
}

export const editEmployee = async (id: any, data: IEmployee): Promise<IEmployee> => {
    const conn = await connection();
    const employee = await getOneEmployee(id) as IEmployee;
    let editedEmployee;
    if (!comparePassword(employee.password, data.password) && data.password !== '') {
        editedEmployee = validateEmployee(data);
        const editedData = await editData(conn, queryUpdateEmployee, queryOneEmployee, editedEmployee, parseInt(id));
        editedEmployee = editedData as IEmployee;
    } else {
        editedEmployee = validateEmployee({...data, password: employee.password});
        const editedData = await editData(conn, queryUpdateEmployee, queryOneEmployee, editedEmployee, parseInt(id));
        editedEmployee = editedData as IEmployee;
    }
    close(conn);
    return editedEmployee;
}

export const deleteEmployee = async (id: any): Promise<IEmployee> => {
    const conn = await connection();
    const employeeDeleted = await getOneEmployee(id);
    const result = await deleteData(conn, queryDeleteEmployee, queryOneEmployee, id);
    close(conn);
    if(result.affectedRows === 0) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    return employeeDeleted;
}