import { Model, Schema, model } from "mongoose";
import { IEmployee } from './../interfaces/Employee';

const employeeSchema = new Schema<IEmployee>({
    full_name: { type: String, required: true},
    photo: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    contact: { type: String, required: true},
    job: { type: String, required: true},
    start_date: { type: String, required: true},
    description: { type: String, required: true},
    status: { type: Boolean, required: true},
    password: { type: String, required: true},
}, {timestamps: true});

export const Employee = model<IEmployee, Model<IEmployee>>('employees', employeeSchema);