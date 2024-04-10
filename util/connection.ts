import mongoose from "mongoose";

export async function connection() {
    await mongoose.connect(`${process.env.SERVER}://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DB_NAME}`);
}