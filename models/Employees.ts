import { Schema, Types, model } from "mongoose";
import { IEmployee } from './../interfaces/Employee';

const employeeSchema = new Schema<IEmployee>({
    _id: Types.ObjectId,
    full_name: { type: String, required: true},
    photo: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    contact: { type: String, required: true},
    job: { type: String, required: true},
    start_date: { type: String, required: true},
    description: { type: String, required: true},
    status: { type: String, required: true},
    password: { type: String, required: true},
});

export const Employee = model<IEmployee>('Employee', employeeSchema);