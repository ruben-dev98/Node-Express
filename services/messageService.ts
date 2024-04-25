import { IMessage } from "../interfaces/Message";
import { close, connection } from "../util/connection";
import { addData, deleteData, editData, find, findOne } from "../util/mySqlQueries";
import { queryAllMessage, queryDeleteMessage, queryInsertIntoMessage, queryOneMessage, queryUpdateMessage } from "../util/queries";
import { validateMessage } from "../validators/messageValidator";

export const getAllMessages = async (): Promise<IMessage[]>  =>  {
    const conn = await connection();
    const result = await find(conn, queryAllMessage) as IMessage[];
    close(conn);
    return result;
}

export const getOneMessage = async (id: any): Promise<IMessage> => {
    const conn = await connection();
    const result = await findOne(conn, queryOneMessage, id);
    close(conn);
    return result as IMessage;
}

export const addMessage = async (data: IMessage): Promise<IMessage> => {
    const conn = await connection();
    const newMessage = validateMessage(data);
    const newData = await addData(conn, queryInsertIntoMessage, queryOneMessage, newMessage);
    close(conn);
    return newData as IMessage;
}

export const editMessage = async (id: any, data: IMessage): Promise<IMessage> => {
    const conn = await connection();
    const editedMessage = validateMessage(data);
    const editedData = await editData(conn, queryUpdateMessage, queryOneMessage, editedMessage, id);
    close(conn);
    return editedData as IMessage;
}

export const deleteMessage = async (id: any): Promise<IMessage> => {
    const conn = await connection();
    const result = await deleteData(conn, queryDeleteMessage, queryOneMessage, id);
    close(conn);
    return result as IMessage;
}