import { IEmployee } from "../interfaces/Employee";
import { Employee } from "../models/Employees";

export const getAllEmployees = async (): Promise<IEmployee[]>  =>  {
    return await Employee.find({});
}

export const getOneEmployee = async (id: any): Promise<IEmployee | null> => {
    return await Employee.findById(id);
}

export const addEmployee = async (data: IEmployee): Promise<IEmployee> => {
    return await Employee.create(data);
}

export const editEmployee = async (id: any, data: IEmployee): Promise<IEmployee | null> => {
    return await Employee.findByIdAndUpdate(id, data);
}

export const deleteEmployee = (id: any): string => {
    Employee.findByIdAndDelete(id);
    return 'Success';
}