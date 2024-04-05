import { ApiError } from "../class/ApiError";
import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { dataNotFoundError, employeeFile, invalidDataError, statusCodeErrorNotFound, statusCodeInvalidData } from "../util/varToUse";
import { Employee } from './../interfaces/Employee';

const getAllDataFromFileEmployees = () => readFromDataFromFile(employeeFile) as Employee[];

export const getAllEmployees = (): Employee[] => {
    return getAllDataFromFileEmployees();
}

export const getOneEmployee = (id: number): Employee | undefined => {
    return getAllDataFromFileEmployees().find(employee => employee.id === id);
}

export const addEmployee = (data: Employee): Employee => {
    const dataEmployee = getAllDataFromFileEmployees();
    const existEmployee = dataEmployee.findIndex(employee => employee.id === data.id);
    if (!data) {
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    } else if (existEmployee > -1) {
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    }
    dataEmployee.push(data);
    writeFromDataFromFile(employeeFile, JSON.stringify(dataEmployee));
    return data;

    throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
}

export const editEmployee = (id: number, data: Employee): Employee => {
    const dataEmployee = getAllDataFromFileEmployees();
    const employeeToEdit = dataEmployee.findIndex(employee => employee.id === id);
    if (employeeToEdit === -1) {
        throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
    } else if (!data) {
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    }
    dataEmployee.splice(employeeToEdit, 1, data);
    writeFromDataFromFile(employeeFile, JSON.stringify(dataEmployee));
    return data;
}

export const deleteEmployee = (id: number): string => {
    const dataEmployee = getAllDataFromFileEmployees();
    const employeeToDelete = dataEmployee.findIndex(employee => employee.id === id);
    if (employeeToDelete === -1) {
        throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
    }
    dataEmployee.splice(employeeToDelete, 1);
    writeFromDataFromFile(employeeFile, JSON.stringify(dataEmployee));
    return 'Success';
}