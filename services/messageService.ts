import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { messageFile } from "../util/fileNames";
import { parseResponse } from "../util/parseResponse";
import { Message } from './../interfaces/Message';
import { Response } from "express";

const dataMessage = readFromDataFromFile(messageFile) as Message[];

export const getAllMessages = (res: Response): void =>  {
    if(dataMessage.length === 0) {
        parseResponse('Messages not found', res);
    }
    parseResponse(dataMessage, res, 200);
}

export const getOneMessage = (id: number, res: Response): void => {
    const message = dataMessage.find(messageIt => messageIt.id === id);
    if(message === undefined) {
        parseResponse('Message not found', res);
    }
    parseResponse(message, res, 200);
}

export const addMessage = (data: Message, res: Response): void => {
    if(data !== null || data !== undefined) {
        const existMessage = dataMessage.findIndex(message => message.id === data.id);
        if(existMessage === -1) {
            dataMessage.push(data);
            writeFromDataFromFile(messageFile, JSON.stringify(dataMessage));
            parseResponse('Message #' + data.id + ' successfully added', res, 200);
        }
    }
    parseResponse('Error on adding a Message', res);
}

export const editMessage = (id: number, data: Message, res: Response): void => {
    const MessageToDelete = dataMessage.findIndex(Message => Message.id === id);
    console.log(data);
    if(MessageToDelete === -1 || data === null || data === undefined) {
        parseResponse('Error on delete edit, Message or edited data not exist', res);
    }
    dataMessage.splice(MessageToDelete, 1, data);
    writeFromDataFromFile(messageFile, JSON.stringify(dataMessage));
    parseResponse('Message #' + id + ' successfully edited', res, 200);
}

export const deleteMessage = (id: number, res: Response): void => {
    const MessageToDelete = dataMessage.findIndex(Message => Message.id === id);
    if(MessageToDelete === -1) {
        parseResponse('Error on delete Message, Message not exist', res);
    }
    dataMessage.splice(MessageToDelete, 1);
    writeFromDataFromFile(messageFile, JSON.stringify(dataMessage));
    parseResponse('Message #' + id +' deleted successfully', res, 200);
}