import { ApiError } from '../class/ApiError';
import { internalServerError, statusCodeInternalServerError } from '../util/varToUse';
import { Employee } from './../models/Employees';

export const getLoginUser = async (email: string) => {
    try {
        return await Employee.findOne({email: email});
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
}