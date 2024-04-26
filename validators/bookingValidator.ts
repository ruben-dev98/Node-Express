import joi from 'joi';
import { IBooking } from '../interfaces/Booking';
import { ONE_HUNDRED, ZERO, bookingStatus, invalidDataError, statusCodeInvalidData } from '../util/constants';
import { ApiError } from '../class/ApiError';

const schema = joi.object<IBooking>({
    full_name: joi.string().required(),
    order_date: joi.date().timestamp().required(),
    check_in: joi.date().timestamp().required(),
    check_out: joi.date().timestamp().required(),
    special_request: joi.string(),
    status: joi.string().equal(bookingStatus.join(',')).required(),
    discount: joi.number().min(ZERO).max(ONE_HUNDRED).required(),
    phone: joi.string(),
    email: joi.string().email().required(),
    room: joi.number().required()
});

export const validateBooking = (data: IBooking) => {
    const {value, error} = schema.validate(data);
    if(error) {
        console.error(error);
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError})
    }
    const values = [value.full_name, new Date(value.order_date).getTime(), new Date(value.check_in).getTime(), new Date(value.check_out).getTime(), value.special_request, value.status, value.discount, value.email, value.room];
    return values;
}