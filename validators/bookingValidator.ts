import joi from 'joi';
import { IBooking } from '../interfaces/Booking';
import { ONE_HUNDRED, ZERO, bookingStatus } from '../util/constants';

const schema = joi.object<IBooking>({
    full_name: joi.string().alphanum(),
    order_date: joi.date().timestamp(),
    check_in: joi.date().timestamp(),
    check_out: joi.date().timestamp(),
    special_request: joi.string().alphanum(),
    status: joi.string().equal(bookingStatus),
    discount: joi.number().min(ZERO).max(ONE_HUNDRED),
    phone: joi.string().alphanum(),
    email: joi.string().email(),
    room: joi.number()
})