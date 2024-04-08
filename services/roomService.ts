import { IRoom } from "../interfaces/Room";
import { Room } from "../models/Rooms";

export const getAllRooms = async (): Promise<IRoom[]> => {
    return await Room.find({});
}

export const getOneRoom = async (id: any): Promise<IRoom | null> => {
    return await Room.findById(id);
}

export const addRoom = async (data: IRoom): Promise<IRoom> => {
    return await Room.create(data);
}

export const editRoom = async (id: any, data: IRoom): Promise<IRoom | null> => {
    return await Room.findByIdAndUpdate(id, data);
}

export const deleteRoom = (id: any): string => {
    Room.findByIdAndDelete(id);
    return 'Success';
}