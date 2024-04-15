import { ApiError } from "../class/ApiError";
import { IEmployee } from "../interfaces/Employee";
import { Employee } from "../models/Employees";
import { comparePassword, hashPassword } from "../util/cryptPassword";
import { dataNotFoundError, statusCodeErrorNotFound } from "../util/constants";

export const getAllEmployees = async (): Promise<IEmployee[]>  =>  {
    return await Employee.find({});
}

export const getOneEmployee = async (id: any): Promise<IEmployee> => {
    const employee = await Employee.findById(id);
    if(employee === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return employee;
}

export const addEmployee = async (data: IEmployee): Promise<IEmployee> => {
    const passwordHash = hashPassword(data.password);
    const employee = await Employee.create({...data, password: passwordHash});
    if(employee === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return employee;
}

export const editEmployee = async (id: any, data: IEmployee): Promise<IEmployee> => {
    const employee = await Employee.findById(id);
    if(employee === null) {
        throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
    }

    let employeeEdited;
    if(!comparePassword(employee.password, data.password)) {
        const passwordHashed = hashPassword(data.password);
        employeeEdited = await Employee.findByIdAndUpdate(id, {...data, password: passwordHashed}, {new: true});
    } else {
        employeeEdited = await Employee.findByIdAndUpdate(id, {...data, password: employee.password}, {new: true});
    }
    
    if(employeeEdited === null) throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
    return employeeEdited;
}

export const deleteEmployee = async (id: any): Promise<IEmployee> => {
    const employee = await Employee.findByIdAndDelete(id);
    if(employee === null) throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
    return employee;
}