import joi from 'joi';
import { IMessage } from './../interfaces/Message';

const schema = joi.object<IMessage>({
    full_name: joi.string().alphanum(),
    email: joi.string().email(),
    phone: joi.string().alphanum(),
    subject: joi.string().alphanum(),
    messages: joi.string().alphanum(),
    date: joi.date().timestamp(),
    read: joi.boolean(),
    archived: joi.boolean(),
    photo: joi.string().uri(),
    time_passed: joi.string().alphanum()
});