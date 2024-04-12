import { Employee } from './../models/Employees';

export const getLoginUser = async (email: string) => {
    return await Employee.findOne({email: email});
}