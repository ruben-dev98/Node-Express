import { ResponseStatus } from "../interfaces/ResponseStatus";
import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { employeeFile } from "../util/fileNames";
import { Employee } from './../interfaces/Employee';

const dataEmployee = readFromDataFromFile(employeeFile) as Employee[];

export const getAllEmployees = (): Employee[]  =>  {
    return dataEmployee;
}

export const getOneEmployee = (id: number): Employee | undefined => {
    return dataEmployee.find(employee => employee.id === id);
}

export const addEmployee = (data: Employee): ResponseStatus => {
    if(data) {
        const existBooking = dataEmployee.findIndex(employee => employee.id === data.id);
        if(existBooking === -1) {
            dataEmployee.push(data);
            writeFromDataFromFile(employeeFile, JSON.stringify(dataEmployee));
            return {
                status: 200,
                message: 'Employee #' + data.id + ' successfully added'
            }
        }
    }
    return {
        status: 404,
        message: 'Error on adding employee'
    }
}

export const editEmployee = (id: number, data: Employee): ResponseStatus => {
    const bookingToDelete = dataEmployee.findIndex(employee => employee.id === id);
    if(bookingToDelete === -1 || !data) {
        return {
            status: 404,
            message: 'Error on edit employee, employee or edited data not exist'
        }
    }
    dataEmployee.splice(bookingToDelete, 1, data);
    writeFromDataFromFile(employeeFile, JSON.stringify(dataEmployee));
    return {
        status: 200,
        message: 'Employee #' + id + ' successfully edited'
    }
}

export const deleteEmployee = (id: number): ResponseStatus => {
    const bookingToDelete = dataEmployee.findIndex(employee => employee.id === id);
    if(bookingToDelete === -1) {
        return {
            status: 404,
            message: 'Error on delete employee, employee not exist'
        }
    }
    dataEmployee.splice(bookingToDelete, 1);
    writeFromDataFromFile(employeeFile, JSON.stringify(dataEmployee));
    return {
        status: 200,
        message: 'Employee #' + id + ' deleted successfully'
    }
}