import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { messageFile } from "../util/fileNames";
import { ParseResponse, parseResponse } from "../util/parseResponse";
import { Message } from './../interfaces/Message';

const dataMessage = readFromDataFromFile(messageFile) as Message[];

export const getAllMessages = (): Message[] | ParseResponse =>  {
    if(dataMessage.length === 0) {
        return parseResponse('Messages not found');
    }
    return dataMessage;
}

export const getOneMessage = (id: number): Message | ParseResponse => {
    const message = dataMessage.find(messageIt => messageIt.id === id);
    if(message === undefined) {
        return parseResponse('Message not found');
    }
    return message;
}

export const addMessage = (data: Message): ParseResponse => {
    if(data !== null || data !== undefined) {
        const existMessage = dataMessage.findIndex(message => message.id === data.id);
        if(existMessage === -1) {
            dataMessage.push(data);
            writeFromDataFromFile(messageFile, JSON.stringify(dataMessage));
            return parseResponse('Message #' + data.id + ' successfully added', 200);
        }
    }
    return parseResponse('Error on adding a Message');
}

export const editMessage = (id: number, data: Message): ParseResponse => {
    const MessageToDelete = dataMessage.findIndex(Message => Message.id === id);
    console.log(data);
    if(MessageToDelete === -1 || data === null || data === undefined) {
        return parseResponse('Error on delete edit, Message or edited data not exist');
    }
    dataMessage.splice(MessageToDelete, 1, data);
    writeFromDataFromFile(messageFile, JSON.stringify(dataMessage));
    return parseResponse('Message #' + id + ' successfully edited', 200);
}

export const deleteMessage = (id: number): ParseResponse => {
    const MessageToDelete = dataMessage.findIndex(Message => Message.id === id);
    if(MessageToDelete === -1) {
        return parseResponse('Error on delete Message, Message not exist');
    }
    dataMessage.splice(MessageToDelete, 1);
    writeFromDataFromFile(messageFile, JSON.stringify(dataMessage));
    return parseResponse('Message #' + id +' deleted successfully', 200);
}