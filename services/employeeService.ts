import { ApiError } from "../class/ApiError";
import { IEmployee } from "../interfaces/Employee";
import { Employee } from "../models/Employees";
import { internalServerError, statusCodeInternalServerError } from "../util/varToUse";

export const getAllEmployees = async (): Promise<IEmployee[]>  =>  {
    try {
        return await Employee.find({});
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
    
}

export const getOneEmployee = async (id: any): Promise<IEmployee | null> => {
    try {
        return await Employee.findById(id);
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
    return await Employee.findById(id);
}

export const addEmployee = async (data: IEmployee): Promise<IEmployee> => {
    try {
        return await Employee.create(data);
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
    
}

export const editEmployee = async (id: any, data: IEmployee): Promise<IEmployee | null> => {
    try {
        return await Employee.findByIdAndUpdate(id, data, {new: true});
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
}

export const deleteEmployee = async (id: any): Promise<IEmployee | null> => {
    try {
        return await Employee.findByIdAndDelete(id);
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
}