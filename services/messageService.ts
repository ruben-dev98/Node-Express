import { ApiError } from "../class/ApiError";
import { readFromDataFromFile, writeFromDataFromFile } from "../util/dataFromFile";
import { dataNotFoundError, invalidDataError, messageFile, statusCodeErrorNotFound, statusCodeInvalidData } from "../util/varToUse";
import { Message } from './../interfaces/Message';

const getAllDataFromFileMessages = () => readFromDataFromFile(messageFile) as Message[];

export const getAllMessages = (): Message[] => {
    return getAllDataFromFileMessages();
}

export const getOneMessage = (id: number): Message | undefined => {
    return getAllDataFromFileMessages().find(message => message.id === id);
}

export const addMessage = (data: Message): Message => {
    const dataMessage = getAllDataFromFileMessages();
    const existMessage = dataMessage.findIndex(message => message.id === data.id);
    if (!data) {
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    } else if (existMessage > -1) {
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    }
    dataMessage.push(data);
    writeFromDataFromFile(messageFile, JSON.stringify(dataMessage));
    return data;
}

export const editMessage = (id: number, data: Message): Message => {
    const dataMessage = getAllDataFromFileMessages();
    const messageToEdit = dataMessage.findIndex(message => message.id === id);
    if (messageToEdit === -1) {
        throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
    } else if (!data) {
        throw new ApiError({ status: statusCodeInvalidData, message: invalidDataError });
    }
    dataMessage.splice(messageToEdit, 1, data);
    writeFromDataFromFile(messageFile, JSON.stringify(dataMessage));
    return data;
}

export const deleteMessage = (id: number): string => {
    const dataMessage = getAllDataFromFileMessages();
    const messageToDelete = dataMessage.findIndex(message => message.id === id);
    if (messageToDelete === -1) {
        throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
    }
    dataMessage.splice(messageToDelete, 1);
    writeFromDataFromFile(messageFile, JSON.stringify(dataMessage));
    return 'Success';
}