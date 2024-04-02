import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { roomFile } from "../util/fileNames";
import { parseResponse } from "../util/parseResponse";
import { Room } from './../interfaces/Room';
import { Response } from "express";

const dataRoom = readFromDataFromFile(roomFile) as Room[];

export const getAllRooms = (res: Response): void =>  {
    if(dataRoom.length === 0) {
        parseResponse('Rooms not found', res);
    }
    parseResponse(dataRoom, res, 200);
}

export const getOneRoom = (id: number, res: Response): void => {
    const room = dataRoom.find(roomIt => roomIt.id === id);
    if(room === undefined) {
        parseResponse('Room not found', res);
    }
    parseResponse(room, res, 200);
}

export const addRoom = (data: Room, res: Response): void => {
    if(data !== null || data !== undefined) {
        const existRoom = dataRoom.findIndex(room => room.id === data.id);
        if(existRoom === -1) {
            dataRoom.push(data);
            writeFromDataFromFile(roomFile, JSON.stringify(dataRoom));
            parseResponse('Room #' + data.id + ' successfully added', res, 200);
        }
    }
    parseResponse('Error on adding a Room', res);
}

export const editRoom = (id: number, data: Room, res: Response): void => {
    const roomToDelete = dataRoom.findIndex(room => room.id === id);
    if(roomToDelete === -1 || data === null || data === undefined) {
        parseResponse('Error on delete edit, Room or edited data not exist', res);
    }
    dataRoom.splice(roomToDelete, 1, data);
    writeFromDataFromFile(roomFile, JSON.stringify(dataRoom));
    parseResponse('Room #' + id + ' successfully edited', res, 200);
}

export const deleteRoom = (id: number, res: Response): void => {
    const roomToDelete = dataRoom.findIndex(room => room.id === id);
    if(roomToDelete === -1) {
        parseResponse('Error on delete Room, Room not exist', res);
    }
    dataRoom.splice(roomToDelete, 1);
    writeFromDataFromFile(roomFile, JSON.stringify(dataRoom));
    parseResponse('Room #' + id +' deleted successfully', res, 200);
}