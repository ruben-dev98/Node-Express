import { Model, Schema, model } from "mongoose";
import { IMessage } from './../interfaces/Message';

const messageSchema = new Schema<IMessage>({
    full_name: { type: String, required: true},
    photo: { type: String, required: true},
    email: { type: String, required: true},
    phone: { type: String, required: true},
    date: { type: String, required: true},
    subject: { type: String, required: true},
    messages: { type: String, required: true},
    read: { type: Boolean, required: true},
    archived: { type: Boolean, required: true},
    time_passed: { type: String, required: true},
}, {timestamps: true});

export const Message = model<IMessage, Model<IMessage>>('messages', messageSchema);