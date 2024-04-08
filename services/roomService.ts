import { ApiError } from "../class/ApiError";
import { IRoom } from "../interfaces/Room";
import { Room } from "../models/Rooms";
import { internalServerError, statusCodeInternalServerError } from "../util/varToUse";

export const getAllRooms = async (): Promise<IRoom[]> => {
    try {
        return await Room.find({});
    } catch (error) {
        throw new ApiError({ status: statusCodeInternalServerError, message: internalServerError })
    }
}

export const getOneRoom = async (id: any): Promise<IRoom | null> => {
    try {
        return await Room.findById(id);
    } catch (error) {
        throw new ApiError({ status: statusCodeInternalServerError, message: internalServerError })
    }
}

export const addRoom = async (data: IRoom): Promise<IRoom> => {
    try {
        return await Room.create(data);
    } catch (error) {
        throw new ApiError({ status: statusCodeInternalServerError, message: internalServerError })
    }
}

export const editRoom = async (id: any, data: IRoom): Promise<IRoom | null> => {
    try {
        return await Room.findByIdAndUpdate(id, data);
    } catch (error) {
        throw new ApiError({ status: statusCodeInternalServerError, message: internalServerError })
    }
}

export const deleteRoom = (id: any): string => {
    try {
        Room.findByIdAndDelete(id);
        return 'Success';
    } catch (error) {
        throw new ApiError({ status: statusCodeInternalServerError, message: internalServerError })
    }
}