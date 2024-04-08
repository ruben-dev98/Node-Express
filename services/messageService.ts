import { ApiError } from "../class/ApiError";
import { IMessage } from "../interfaces/Message";
import { Message } from "../models/Messages";
import { internalServerError, statusCodeInternalServerError } from "../util/varToUse";

export const getAllMessages = async (): Promise<IMessage[]>  =>  {
    try {
        return await Message.find({});
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
}

export const getOneMessage = async (id: any): Promise<IMessage | null> => {
    try {
        return await Message.findById(id);
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
}

export const addMessage = async (data: IMessage): Promise<IMessage> => {
    try {
        return await Message.create(data);
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
    
}

export const editMessage = async (id: any, data: IMessage): Promise<IMessage | null> => {
    try {
        return await Message.findByIdAndUpdate(id, data);
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
    
}

export const deleteMessage = (id: any): string => {
    try {
        Message.findByIdAndDelete(id);
        return 'Success';
    } catch(error) {
        throw new ApiError({status: statusCodeInternalServerError, message: internalServerError})
    }
    
}