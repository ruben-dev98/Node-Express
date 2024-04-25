import joi from 'joi';
import { IRoom } from '../interfaces/Room';
import { FIVE, FOURTEEN, ONE_HUNDRED, THREE, ZERO, invalidDataError, roomStatus, roomTypes, statusCodeInvalidData } from '../util/constants';
import { ApiError } from '../class/ApiError';

const schema = joi.object<IRoom>({
    photo: joi.array().min(THREE).max(FIVE),
    type: joi.string().equal(roomTypes.join(',')),
    number: joi.number(),
    description: joi.string(),
    offer: joi.boolean(),
    price: joi.number(),
    cancellation: joi.string(),
    amenities: joi.array().equal().max(FOURTEEN),
    discount: joi.number().min(ZERO).max(ONE_HUNDRED),
    status: joi.string().equal(roomStatus.join(','))
});

export const validateRoom = (data: IRoom) => {
    const {value, error} = schema.validate(data);
    if(error) {
        console.error(error);
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError})
    }
    //const values = [value.photo, value.type, value.number, value.description, value.offer, value.price, value.cancellation, value.amenities, value.discount, value.status];
    return value;
}