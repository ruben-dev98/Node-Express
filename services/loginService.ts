import { ApiError } from '../class/ApiError';
import { dataNotFoundError, statusCodeErrorNotFound } from '../util/constants';
import { Employee } from './../models/Employees';

export const getUserByEmail = async (email: string) => {
    const employee = await Employee.findOne({email: email})
    if(employee === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return employee;
}