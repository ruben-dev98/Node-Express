import { ApiError } from "../class/ApiError";
import { IEmployee } from "../interfaces/Employee";
import { comparePassword, hashPassword } from "../util/cryptPassword";
import { dataNotFoundError, invalidDataError, statusCodeErrorNotFound, statusCodeInvalidData, tableEmployee } from "../util/constants";
import { close, connection } from "../util/connection";
import { addData, deleteData, editData, find, findOne } from "../util/mySqlQueries";
import { QueryResult } from "mysql2";
import { EmployeeTable } from "../util/seedData/createTableEmployee";

export const getAllEmployees = async (): Promise<QueryResult>  =>  {
    const conn = await connection();
    const result = await find(conn, tableEmployee);
    close(conn);
    return result;
}

export const getOneEmployee = async (id: any): Promise<QueryResult> => {
    const conn = await connection();
    const result = await findOne(conn, tableEmployee, id);
    close(conn);
    if(!result) {
        throw new ApiError({status: 400, message: 'error'})
    }
    return result;
}

export const addEmployee = async (data: IEmployee): Promise<IEmployee> => {
    const conn = await connection();
    const passwordHashed = hashPassword(data.password);
    const {resultHeaders, newData} = await addData(conn, tableEmployee, EmployeeTable, {...data, password: passwordHashed});
    close(conn);
    if(resultHeaders.affectedRows === 0) {
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError})
    }
    return newData;
}

export const editEmployee = async (id: any, data: IEmployee): Promise<QueryResult> => {
    const conn = await connection();
    const employee = await getOneEmployee(id);
    if (!comparePassword(employee.password, data.password) && data.password !== '') {
        console.log(employee.password, data.password);
        const passwordHashed = hashPassword(data.password);
        employeeEdited = await Employee.findByIdAndUpdate(id, { ...data, password: passwordHashed }, { new: true });
    } else {
        employeeEdited = await Employee.findByIdAndUpdate(id, { ...data, password: employee.password }, { new: true });
    }
    const {resultHeaders, newData} = await editData(conn, tableEmployee, EmployeeTable, data, parseInt(id));
    close(conn);
    if(resultHeaders.affectedRows === 0) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    return newData;
}

export const deleteEmployee = async (id: any): Promise<QueryResult | null> => {
    const conn = await connection();
    const result = await deleteData(conn, tableEmployee, id);
    close(conn);
    if(result.affectedRows === 0) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    return result;
}