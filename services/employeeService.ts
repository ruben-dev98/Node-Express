import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { parseResponse } from "../util/parseResponse";
import { employeeFile } from "../util/fileNames";
import { Employee } from './../interfaces/Employee';
import { Response } from "express";

const dataEmployee = readFromDataFromFile(employeeFile) as Employee[];

export const getAllEmployees = (res: Response): void =>  {
    if(dataEmployee.length === 0) {
        parseResponse('Employees not found', res);
    }
    parseResponse(dataEmployee, res, 200);
}

export const getOneEmployee = (id: number, res: Response): void => {
    const employee = dataEmployee.find(employeeIt => employeeIt.id === id);
    if(employee === undefined) {
        parseResponse('Employee not found', res);
    }
    parseResponse(employee, res, 200);
}

export const addEmployee = (data: Employee, res: Response): void => {
    
    if(data !== null || data !== undefined) {
        const existEmployee = dataEmployee.findIndex(employee => employee.id === data.id);
        if(existEmployee === -1) {
            dataEmployee.push(data);
            writeFromDataFromFile(employeeFile, JSON.stringify(dataEmployee));
            parseResponse('Employee #' + data.id + ' successfully added', res, 200);
        }
    }
    parseResponse('Error on adding a Employee', res);
}

export const editEmployee = (id: number, data: Employee, res: Response): void => {
    const employeeToDelete = dataEmployee.findIndex(employee => employee.id === id);
    console.log(data);
    if(employeeToDelete === -1 || data === null || data === undefined) {
        parseResponse('Error on delete edit, Employee or edited data not exist', res);
    }
    dataEmployee.splice(employeeToDelete, 1, data);
    writeFromDataFromFile(employeeFile, JSON.stringify(dataEmployee));
    parseResponse('Employee #' + id + ' successfully edited', res, 200);
}

export const deleteEmployee = (id: number, res: Response): void => {
    const employeeToDelete = dataEmployee.findIndex(employee => employee.id === id);
    if(employeeToDelete === -1) {
        parseResponse('Error on delete Employee, Employee not exist', res);
    }
    dataEmployee.splice(employeeToDelete, 1);
    writeFromDataFromFile(employeeFile, JSON.stringify(dataEmployee));
    parseResponse('Employee #' + id +' deleted successfully', res, 200);
}