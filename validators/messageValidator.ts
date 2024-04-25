import joi from 'joi';
import { IMessage } from './../interfaces/Message';
import { ApiError } from '../class/ApiError';
import { ONE, ZERO, invalidDataError, statusCodeInvalidData } from '../util/constants';

const schema = joi.object<IMessage>({
    full_name: joi.string(),
    email: joi.string().email(),
    phone: joi.string(),
    subject: joi.string(),
    messages: joi.string(),
    date: joi.date().timestamp(),
    is_read: joi.boolean().truthy(ONE).falsy(ZERO),
    archived: joi.boolean().truthy(ONE).falsy(ZERO),
    photo: joi.string().uri(),
    time_passed: joi.string()
});

export const validateMessage = (data: IMessage) => {
    const {value, error} = schema.validate(data);
    if(error) {
        console.error(error);
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError})
    }
    const values = [value.full_name, value.email, value.phone, value.subject, value.messages, new Date(value.date).getTime(), value.is_read, value.archived, value.photo, value.time_passed];
    return values;
}