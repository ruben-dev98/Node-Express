import { ResponseStatus } from "../interfaces/ResponseStatus";
import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { roomFile } from "../util/fileNames";
import { Room } from './../interfaces/Room';

const dataRoom = readFromDataFromFile(roomFile) as Room[];

export const getAllRooms = (): Room[] => {
    return dataRoom;
}

export const getOneRoom = (id: number): Room | undefined => {
    return dataRoom.find(room => room.id === id);
}

export const addRoom = (data: Room): ResponseStatus => {
    if (data) {
        const existBooking = dataRoom.findIndex(room => room.id === data.id);
        if (existBooking === -1) {
            dataRoom.push(data);
            writeFromDataFromFile(roomFile, JSON.stringify(dataRoom));
            return {
                status: 200,
                message: 'Room #' + data.id + ' successfully added'
            }
        }
    }
    return {
        status: 400,
        message: 'Error on adding room'
    }
}

export const editRoom = (id: number, data: Room): ResponseStatus => {
    const bookingToDelete = dataRoom.findIndex(room => room.id === id);
    if (bookingToDelete === -1 || !data) {
        return {
            status: 404,
            message: 'Error on edit room, room or edited data not exist'
        }
    }
    dataRoom.splice(bookingToDelete, 1, data);
    writeFromDataFromFile(roomFile, JSON.stringify(dataRoom));
    return {
        status: 200,
        message: 'Room #' + id + ' successfully edited'
    }
}

export const deleteRoom = (id: number): ResponseStatus => {
    const bookingToDelete = dataRoom.findIndex(room => room.id === id);
    if (bookingToDelete === -1) {
        return {
            status: 404,
            message: 'Error on delete room, room not exist'
        }
    }
    dataRoom.splice(bookingToDelete, 1);
    writeFromDataFromFile(roomFile, JSON.stringify(dataRoom));
    return {
        status: 200,
        message: 'Room #' + id + ' deleted successfully'
    }
}