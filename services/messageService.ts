import { ResponseStatus } from "../interfaces/ResponseStatus";
import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { messageFile } from "../util/fileNames";
import { Message } from './../interfaces/Message';

const dataMessage = readFromDataFromFile(messageFile) as Message[];

export const getAllMessages = (): Message[]  =>  {
    return dataMessage;
}

export const getOneMessage = (id: number): Message | undefined => {
    return dataMessage.find(message => message.id === id);
}

export const addMessage = (data: Message): ResponseStatus => {
    if(data) {
        const existBooking = dataMessage.findIndex(message => message.id === data.id);
        if(existBooking === -1) {
            dataMessage.push(data);
            writeFromDataFromFile(messageFile, JSON.stringify(dataMessage));
            return {
                status: 200,
                message: 'Message #' + data.id + ' successfully added'
            }
        }
    }
    return {
        status: 404,
        message: 'Error on adding message'
    }
}

export const editMessage = (id: number, data: Message): ResponseStatus => {
    const bookingToDelete = dataMessage.findIndex(message => message.id === id);
    if(bookingToDelete === -1 || !data) {
        return {
            status: 404,
            message: 'Error on edit message, message or edited data not exist'
        }
    }
    dataMessage.splice(bookingToDelete, 1, data);
    writeFromDataFromFile(messageFile, JSON.stringify(dataMessage));
    return {
        status: 200,
        message: 'Message #' + id + ' successfully edited'
    }
}

export const deleteMessage = (id: number): ResponseStatus => {
    const bookingToDelete = dataMessage.findIndex(message => message.id === id);
    if(bookingToDelete === -1) {
        return {
            status: 404,
            message: 'Error on delete message, message not exist'
        }
    }
    dataMessage.splice(bookingToDelete, 1);
    writeFromDataFromFile(messageFile, JSON.stringify(dataMessage));
    return {
        status: 200,
        message: 'Message #' + id + ' deleted successfully'
    }
}