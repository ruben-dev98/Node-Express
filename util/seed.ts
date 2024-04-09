import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { faker } from '@faker-js/faker';
import { Booking } from "../models/Bookings"
import { Employee } from "../models/Employees";
import { Room } from "../models/Rooms";
import { Message } from "../models/Messages";
import { IBooking } from "../interfaces/Booking";
import { IRoom } from './../interfaces/Room';
import { IMessage } from "../interfaces/Message";
import { IEmployee } from "../interfaces/Employee";
import { nameCollectionBookings, nameCollectionEmployees, nameCollectionMessages, nameCollectionRooms } from "./varToUse";
import { hashPassword } from "./cryptPassword";

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

const randomRoomId = (rooms: IRoom[]) => {
    const randomNumber = Math.round(Math.random() * (rooms.length - 1));
    return rooms[randomNumber]._id;
}

const createNewBooking = (aRooms: IRoom[]): IBooking => {
    const roomId = randomRoomId(aRooms);
    return new Booking({
        _id: faker.string.uuid(),
        order_date: faker.date.past().getTime(),
        check_in: faker.date.past().getTime(),
        check_out: faker.date.past().getTime(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        full_name: faker.person.fullName(),
        special_request: faker.lorem.sentences(2),
        status: 'In Progress',
        room: roomId
    });
}

const createNewEmployee = (): IEmployee => {
    let passwordHash = hashPassword('admin');
    return new Employee({
        _id: faker.string.uuid(),
        full_name: faker.person.fullName(),
        photo: faker.image.avatar(),
        email: faker.internet.email(),
        contact: faker.phone.number(),
        job: 'Manager',
        start_date: faker.date.past().getTime(),
        description: faker.lorem.sentences(2),
        status: true,
        password: passwordHash
    });
}

const createNewRoom = (): IRoom => {
    return new Room({
        _id: faker.string.uuid(),
        photo: [
            "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
            "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
            "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
        ],
        type: 'Single Bed',
        number: faker.number.int({ min: 1, max: 100}),
        description: faker.lorem.sentences(2),
        offer: true,
        price: faker.number.int({ min: 100, max: 1500}),
        cancellation: faker.lorem.sentences(2),
        amenities: [
            "Shop near",
            "Kitchen",
            "Shower",
            "Towels",
            "Smart Security"],
        discount: faker.number.int({ min: 0, max: 50}),
        status: 'Available'
    });
}

const createNewMessage = (): IMessage => {
    return new Message({
        _id: faker.string.uuid(),
        full_name: faker.person.fullName(),
        photo: faker.image.avatar(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        date: new Date().getTime(),
        subject: faker.lorem.sentences(2),
        messages: faker.lorem.sentences(2),
        read: false,
        archived: true,
        time_passed: '4 mins ago',
    });
}

const createBookingsToSeed = (aRooms: IRoom[]) => {
    const aData = [];
    for (let i = 0; i < 10; i++) {
        aData.push(createNewBooking(aRooms));
    }
    return aData;
}

const createRoomsToSeed = () => {
    const aData = [];
    for (let i = 0; i < 10; i++) {
        aData.push(createNewRoom());
    }
    return aData;
}

const createEmployeesToSeed = () => {
    const aData = [];
    for (let i = 0; i < 10; i++) {
        aData.push(createNewEmployee());
    }
    return aData;
}

const createMessagesToSeed = () => {
    const aData = [];
    for (let i = 0; i < 10; i++) {
        aData.push(createNewMessage());
    }
    return aData;
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