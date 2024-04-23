import { ApiError } from "../class/ApiError";
import { IEmployee } from "../interfaces/Employee";
import { comparePassword, hashPassword } from "../util/cryptPassword";
import { dataNotFoundError, invalidDataError, statusCodeErrorNotFound, statusCodeInvalidData, tableEmployee } from "../util/constants";
import { close, connection } from "../util/connection";
import { addData, deleteData, editData, find, findOne } from "../util/mySqlQueries";
import { EmployeeTable } from "../util/seedData/createTableEmployee";

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
    const passwordHashed = hashPassword(data.password);
    const {resultHeaders, newData} = await addData(conn, tableEmployee, EmployeeTable, {...data, password: passwordHashed});
    close(conn);
    if(resultHeaders.affectedRows === 0) {
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError})
    }
    return newData as IEmployee;
}

export const editEmployee = async (id: any, data: IEmployee): Promise<IEmployee> => {
    const conn = await connection();
    const employee = await getOneEmployee(id) as IEmployee;
    let headerResults, editedEmployee;
    if (!comparePassword(employee.password, data.password) && data.password !== '') {
        const passwordHashed = hashPassword(data.password);
        const{resultHeaders, newData} = await editData(conn, tableEmployee, EmployeeTable, {...data, password: passwordHashed}, parseInt(id));
        headerResults = resultHeaders;
        editedEmployee = newData as IEmployee;
    } else {
        const{resultHeaders, newData} = await editData(conn, tableEmployee, EmployeeTable, {...data, password: employee.password}, parseInt(id));
        headerResults = resultHeaders;
        editedEmployee = newData as IEmployee;
    }
    close(conn);
    if(headerResults.affectedRows === 0) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    return editedEmployee;
}

export const deleteEmployee = async (id: any): Promise<IEmployee> => {
    const conn = await connection();
    const employeeDeleted = await getOneEmployee(id);
    const result = await deleteData(conn, tableEmployee, id);
    close(conn);
    if(result.affectedRows === 0) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    return employeeDeleted;
}