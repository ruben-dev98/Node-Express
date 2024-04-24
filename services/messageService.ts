import { ApiError } from "../class/ApiError";
import { IMessage } from "../interfaces/Message";
import { close, connection } from "../util/connection";
import { dataNotFoundError, invalidDataError, statusCodeErrorNotFound, statusCodeInvalidData, tableMessage } from "../util/constants";
import { addData, deleteData, editData, find, findOne } from "../util/mySqlQueries";
import { MessageTable } from "../util/seedData/createTableMessage";

export const getAllMessages = async (): Promise<IMessage>  =>  {
    const conn = await connection();
    const sqlQuery = `SELECT * FROM ${tableMessage}`;
    const result = await find(conn, sqlQuery) as IMessage;
    close(conn);
    return result;
}

export const getOneMessage = async (id: any): Promise<IMessage> => {
    const conn = await connection();
    const sqlQuery = `SELECT * FROM ${tableMessage} WHERE _id = ?`;
    const result = await findOne(conn, sqlQuery, id);
    close(conn);
    return result as IMessage;
}

export const addMessage = async (data: IMessage): Promise<IMessage> => {
    const conn = await connection();
    const {resultHeaders, newData} = await addData(conn, tableMessage, MessageTable, data);
    close(conn);
    if(resultHeaders.affectedRows === 0) {
        throw new ApiError({status: statusCodeInvalidData, message: invalidDataError})
    }
    return newData as IMessage;
}

export const editMessage = async (id: any, data: IMessage): Promise<IMessage> => {
    const conn = await connection();
    const {resultHeaders, newData} = await editData(conn, tableMessage, MessageTable, data, parseInt(id));
    close(conn);
    if(resultHeaders.affectedRows === 0) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    return newData as IMessage;
}

export const deleteMessage = async (id: any): Promise<IMessage> => {
    const conn = await connection();
    const MessageDeleted = await getOneMessage(id);
    const result = await deleteData(conn, tableMessage, id);
    close(conn);
    if(result.affectedRows === 0) {
        throw new ApiError({status: statusCodeErrorNotFound, message: dataNotFoundError})
    }
    return MessageDeleted;
}