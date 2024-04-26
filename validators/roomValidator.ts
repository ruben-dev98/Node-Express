import joi from 'joi';
import { IRoom } from '../interfaces/Room';
import { FIVE, FOURTEEN, ONE_HUNDRED, THREE, ZERO, invalidDataError, roomStatus, roomTypes, statusCodeInvalidData } from '../util/constants';
import { ApiError } from '../class/ApiError';

const schema = joi.object<IRoom>({
    photo: joi.array().min(THREE).max(FIVE).required(),
    type: joi.string().equal(roomTypes.join(',')).required(),
    number: joi.number().required(),
    description: joi.string(),
    offer: joi.boolean().required(),
    price: joi.number().required(),
    cancellation: joi.string(),
    amenities: joi.array().equal().max(FOURTEEN).required(),
    discount: joi.number().min(ZERO).max(ONE_HUNDRED).required(),
    status: joi.string().equal(roomStatus.join(',')).required()
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