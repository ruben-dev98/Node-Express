import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { IBooking } from "../interfaces/Booking";
import { IRoom } from './../interfaces/Room';
import { IMessage } from "../interfaces/Message";
import { IEmployee } from "../interfaces/Employee";
import { nameCollectionBookings, nameCollectionEmployees, nameCollectionMessages, nameCollectionRooms } from "./varToUse";
import { createRoomsToSeed } from "./seedData/createRoomsToSeed";
import { createMessagesToSeed } from "./seedData/createMessagesToSeed";
import { createEmployeesToSeed } from "./seedData/createEmployeesToSeed";
import { createBookingsToSeed } from "./seedData/createBookingsToSeed";

dotenv.config();

type data = IMessage | IRoom | IEmployee | IBooking;

const connect = async () => {
    const uri = `mongodb://${process.env.HOST}`;
    const client = new MongoClient(uri);
    try {
        await client.connect();
    } catch(error) {
        console.error(error)
    }
    return client;
}

const createCollection = async (client: MongoClient, collectionName: string, dataToCreate: data[]) => {
    try {
        const collection = await client.db(process.env.DB_NAME).collection(collectionName);
        await collection.drop();
        await collection.insertMany(dataToCreate);
    } catch (error) {
        console.error(error);
    }
}

const close = (client: MongoClient) => {
    client.close();
}

const main = async () => {
    const client = await connect();
    try {
        const aRooms = createRoomsToSeed();
        await createCollection(client, nameCollectionRooms, aRooms);

        await createCollection(client, nameCollectionMessages, createMessagesToSeed());
        await createCollection(client, nameCollectionEmployees, createEmployeesToSeed());
        await createCollection(client, nameCollectionBookings, createBookingsToSeed(aRooms));
        
        close(client);
    } catch (error) {
        console.error(error);
    }
}

main();