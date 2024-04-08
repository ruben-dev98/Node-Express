import bcrypt from 'bcrypt';
import { ApiError } from '../class/ApiError';
import { internalServerError, statusCodeInternalServerError } from './varToUse';
const saltRounds = 10;

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, saltRounds, (err: Error | undefined, hash: string) => {
        if (err) throw new ApiError({status: statusCodeInternalServerError, message: internalServerError});
        return hash;
    })
};

export const comparePassword = async (userPassword: string, password: string) => {
    return await bcrypt.compare(password, userPassword, (err: Error | undefined, result: boolean) => {
        if (err) throw new ApiError({status: statusCodeInternalServerError, message: internalServerError});
        return result;
    })
}