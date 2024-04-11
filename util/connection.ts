import mongoose from "mongoose";

export async function connection(test?: boolean) {
    if(test) await mongoose.connect(`${process.env.SERVER_TEST}://${process.env.HOST_TEST}/${process.env.DB_NAME}`);
    else await mongoose.connect(`${process.env.SERVER}://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DB_NAME}`);
}