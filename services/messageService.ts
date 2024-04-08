import { IMessage } from "../interfaces/Message";
import { Message } from "../models/Messages";

export const getAllMessages = async (): Promise<IMessage[]>  =>  {
    return await Message.find({});
}

export const getOneMessage = async (id: any): Promise<IMessage | null> => {
    return await Message.findById(id);
}

export const addMessage = async (data: IMessage): Promise<IMessage> => {
    return await Message.create(data);
}

export const editMessage = async (id: any, data: IMessage): Promise<IMessage | null> => {
    return await Message.findByIdAndUpdate(id, data);
}

export const deleteMessage = (id: any): string => {
    Message.findByIdAndDelete(id);
    return 'Success';
}