import joi from 'joi';
import { IRoom } from '../interfaces/Room';
import { FIVE, FOURTEEN, ONE_HUNDRED, THREE, ZERO, roomStatus, roomTypes } from '../util/constants';

const schema = joi.object<IRoom>({
    photo: joi.array().min(THREE).max(FIVE),
    type: joi.string().equal(roomTypes),
    number: joi.number(),
    description: joi.string().alphanum(),
    offer: joi.boolean(),
    price: joi.number(),
    cancellation: joi.string(),
    amenities: joi.array().equal().max(FOURTEEN),
    discount: joi.number().min(ZERO).max(ONE_HUNDRED),
    status: joi.string().equal(roomStatus)
});