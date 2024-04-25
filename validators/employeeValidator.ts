import joi from 'joi';
import { IEmployee } from '../interfaces/Employee';
import { employeeJobs, invalidDataError, statusCodeInvalidData } from '../util/constants';
import { ApiError } from '../class/ApiError';
import { hashPassword } from '../util/cryptPassword';

const schema = joi.object<IEmployee>({
    photo: joi.string().uri(),
    full_name: joi.string(),
    email: joi.string().email(),
    start_date: joi.date().timestamp(),
    description: joi.string(),
    job: joi.string().equal(employeeJobs.join(',')),
    contact: joi.string(),
    status: joi.boolean(),
    password: joi.string() || ''
});

export const validateEmployee = (data: IEmployee) => {
    const {value, error} = schema.validate(data);
    if(error) {
        console.error(error);
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError})
    }
    let passwordHashed = value.password;
    if(value.password !== '') {
        passwordHashed = hashPassword(value.password);
    } 
    const values = [value.photo, value.full_name, value.email, new Date(value.start_date).getTime(), value.description, value.job, value.contact, value.status, passwordHashed];
    return values;
}