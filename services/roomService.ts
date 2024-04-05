import { ApiError } from "../class/ApiError";
import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { dataNotFoundError, invalidDataError, roomFile, statusCodeErrorNotFound, statusCodeInvalidData } from "../util/varToUse";
import { Room } from './../interfaces/Room';

const getAllDataFromFileRooms = () => readFromDataFromFile(roomFile) as Room[];

export const getAllRooms = (): Room[] => {
    return getAllDataFromFileRooms();
}

export const getOneRoom = (id: number): Room | undefined => {
    return getAllDataFromFileRooms().find(room => room.id === id);
}

export const addRoom = (data: Room): Room => {
    const dataRoom = getAllDataFromFileRooms();
    const existRoom = dataRoom.findIndex(room => room.id === data.id);
    if (!data) {
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    } else if (existRoom > -1) {
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    }
    dataRoom.push(data);
    writeFromDataFromFile(roomFile, JSON.stringify(dataRoom));
    return data;
}

export const editRoom = (id: number, data: Room): Room => {
    const dataRoom = getAllDataFromFileRooms();
    const roomToEdit = dataRoom.findIndex(room => room.id === id);
    if (roomToEdit === -1) {
        throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
    } else if (!data) {
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    }
    dataRoom.splice(roomToEdit, 1, data);
    writeFromDataFromFile(roomFile, JSON.stringify(dataRoom));
    return data;
}

export const deleteRoom = (id: number): string => {
    const dataRoom = getAllDataFromFileRooms();
    const roomToDelete = dataRoom.findIndex(room => room.id === id);
    if (roomToDelete === -1) {
        throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
    }
    dataRoom.splice(roomToDelete, 1);
    writeFromDataFromFile(roomFile, JSON.stringify(dataRoom));
    return 'Success';
}