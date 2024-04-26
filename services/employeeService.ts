import { IEmployee } from "../interfaces/Employee";
import { comparePassword } from "../util/cryptPassword";
import { close, connection } from "../util/connection";
import { addData, deleteData, editData, find, findOne } from "../util/mySqlQueries";
import { validateEmployee } from "../validators/employeeValidator";
import { queryAllEmployee, queryDeleteEmployee, queryInsertIntoEmployee, queryOneEmployee, queryUpdateEmployee } from "../util/queries";

export const getAllEmployees = async (): Promise<IEmployee[]>  =>  {
    const conn = await connection();
    const result = await find(conn, queryAllEmployee) as IEmployee[];
    close(conn);
    return result;
}

export const getOneEmployee = async (id: any): Promise<IEmployee> => {
    const conn = await connection();
    const result = await findOne(conn, queryOneEmployee, id);
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
    const dataDeleted = await deleteData(conn, queryDeleteEmployee, queryOneEmployee, id);
    close(conn);
    return dataDeleted as IEmployee;
}