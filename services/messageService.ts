import { ApiError } from "../class/ApiError";
import { IMessage } from "../interfaces/Message";
import { Message } from "../models/Messages";
import { dataNotFoundError, statusCodeErrorNotFound } from "../util/constants";

export const getAllMessages = async (): Promise<IMessage[]>  =>  {
    return await Message.find({});
}

export const getOneMessage = async (id: any): Promise<IMessage> => {
    const message = await Message.findById(id);
    if(message === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return message;
}

export const addMessage = async (data: IMessage): Promise<IMessage> => {
    const message = await Message.create(data);
    if(message === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return message;
}

export const editMessage = async (id: any, data: IMessage): Promise<IMessage> => {
    const message = await Message.findByIdAndUpdate(id, data, {new: true});
    if(message === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return message;
}

export const deleteMessage = async (id: any): Promise<IMessage> => {
    const message = await Message.findByIdAndDelete(id);
    if(message === null) throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError});
    return message;
}