import { readFromDataFromFile, writeFromDataFromFile } from "../helpers/dataFromFile";
import { ParseResponse, parseResponse } from "../helpers/parseResponse";
import { employeeFile } from "../helpers/fileNames";
import { Employee } from './../interfaces/Employee';

const dataEmployee = readFromDataFromFile(employeeFile) as Employee[];

export const getAllEmployees = (): Employee[] | ParseResponse =>  {
    if(dataEmployee.length === 0) {
        return parseResponse('Employees not found');
    }
    return dataEmployee;
}

export const getOneEmployee = (id: number): Employee | ParseResponse => {
    const employee = dataEmployee.find(employeeIt => employeeIt.id === id);
    if(employee === undefined) {
        return parseResponse('Employee not found');
    }
    return employee;
}

export const addEmployee = (data: Employee): ParseResponse => {
    
    if(data !== null || data !== undefined) {
        const existEmployee = dataEmployee.findIndex(employee => employee.id === data.id);
        if(existEmployee === -1) {
            dataEmployee.push(data);
            writeFromDataFromFile(employeeFile, JSON.stringify(dataEmployee));
            return parseResponse('Employee #' + data.id + ' successfully added', 200);
        }
    }
    return parseResponse('Error on adding a Employee');
}

export const editEmployee = (id: number, data: Employee): ParseResponse => {
    const employeeToDelete = dataEmployee.findIndex(employee => employee.id === id);
    console.log(data);
    if(employeeToDelete === -1 || data === null || data === undefined) {
        return parseResponse('Error on delete edit, Employee or edited data not exist');
    }
    dataEmployee.splice(employeeToDelete, 1, data);
    writeFromDataFromFile(employeeFile, JSON.stringify(dataEmployee));
    return parseResponse('Employee #' + id + ' successfully edited', 200);
}

export const deleteEmployee = (id: number): ParseResponse => {
    const employeeToDelete = dataEmployee.findIndex(employee => employee.id === id);
    if(employeeToDelete === -1) {
        return parseResponse('Error on delete Employee, Employee not exist');
    }
    dataEmployee.splice(employeeToDelete, 1);
    writeFromDataFromFile(employeeFile, JSON.stringify(dataEmployee));
    return parseResponse('Employee #' + id +' deleted successfully', 200);
}