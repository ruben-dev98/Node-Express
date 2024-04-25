import joi from 'joi';
import { IEmployee } from '../interfaces/Employee';
import { employeeJobs } from '../util/constants';

const schema = joi.object<IEmployee>({
    photo: joi.string().uri(),
    full_name: joi.string().alphanum(),
    email: joi.string().email(),
    start_date: joi.date().timestamp(),
    description: joi.string().alphanum(),
    job: joi.string().equal(employeeJobs),
    contact: joi.string().alphanum(),
    status: joi.boolean(),
    password: joi.string().alphanum()
});