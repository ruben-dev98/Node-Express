import joi from 'joi';
import { IBooking } from '../interfaces/Booking';
import { ONE_HUNDRED, ZERO, bookingStatus, invalidDataError, statusCodeInvalidData } from '../util/constants';
import { ApiError } from '../class/ApiError';

const schema = joi.object<IBooking>({
    full_name: joi.string(),
    order_date: joi.date().timestamp(),
    check_in: joi.date().timestamp(),
    check_out: joi.date().timestamp(),
    special_request: joi.string(),
    status: joi.string().equal(bookingStatus.join(',')),
    discount: joi.number().min(ZERO).max(ONE_HUNDRED),
    phone: joi.string(),
    email: joi.string().email(),
    room: joi.number()
});

export const validateBooking = (data: IBooking) => {
    const {value, error} = schema.validate(data);
    if(error) {
        console.error(error);
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError})
    }
    const values = [value.full_name, value.order_date, value.check_in, value.check_out, value.special_request, value.status, value.discount, value.email, value.room];
    return values;
}