import { ApiError } from "../class/ApiError";
import { IRoom } from "../interfaces/Room";
import { Room } from "../models/Rooms";
import { dataNotFoundError, statusCodeErrorNotFound } from "../util/constants";

export const getAllRooms = async (): Promise<IRoom[]> => {
    return await Room.find({});
}

export const getOneRoom = async (id: any): Promise<IRoom> => {
    const room = await Room.findById(id);
    if(room === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return room;
}

export const addRoom = async (data: IRoom): Promise<IRoom> => {
    const room = await Room.create(data);
    if(room === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return room;
}

export const editRoom = async (id: any, data: IRoom): Promise<IRoom> => {
    const room = await Room.findByIdAndUpdate(id, data, {new: true});
    if(room === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return room;
}

export const deleteRoom = async (id: any): Promise<IRoom> => {
    const room = await Room.findByIdAndDelete(id);
    if(room === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return room;
}