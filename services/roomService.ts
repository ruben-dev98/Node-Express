import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { roomFile } from "../util/fileNames";
import { ParseResponse, parseResponse } from "../util/parseResponse";
import { Room } from './../interfaces/Room';

const dataRoom = readFromDataFromFile(roomFile) as Room[];

export const getAllRooms = (): Room[] | ParseResponse =>  {
    if(dataRoom.length === 0) {
        return parseResponse('Rooms not found');
    }
    return dataRoom;
}

export const getOneRoom = (id: number): Room | ParseResponse => {
    const room = dataRoom.find(roomIt => roomIt.id === id);
    if(room === undefined) {
        return parseResponse('Room not found');
    }
    return room;
}

export const addRoom = (data: Room): ParseResponse => {
    if(data !== null || data !== undefined) {
        const existRoom = dataRoom.findIndex(room => room.id === data.id);
        if(existRoom === -1) {
            dataRoom.push(data);
            writeFromDataFromFile(roomFile, JSON.stringify(dataRoom));
            return parseResponse('Room #' + data.id + ' successfully added', 200);
        }
    }
    return parseResponse('Error on adding a Room');
}

export const editRoom = (id: number, data: Room): ParseResponse => {
    const roomToDelete = dataRoom.findIndex(room => room.id === id);
    if(roomToDelete === -1 || data === null || data === undefined) {
        return parseResponse('Error on delete edit, Room or edited data not exist');
    }
    dataRoom.splice(roomToDelete, 1, data);
    writeFromDataFromFile(roomFile, JSON.stringify(dataRoom));
    return parseResponse('Room #' + id + ' successfully edited', 200);
}

export const deleteRoom = (id: number): ParseResponse => {
    const roomToDelete = dataRoom.findIndex(room => room.id === id);
    if(roomToDelete === -1) {
        return parseResponse('Error on delete Room, Room not exist');
    }
    dataRoom.splice(roomToDelete, 1);
    writeFromDataFromFile(roomFile, JSON.stringify(dataRoom));
    return parseResponse('Room #' + id +' deleted successfully', 200);
}