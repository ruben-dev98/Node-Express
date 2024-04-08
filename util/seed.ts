import  { MongoClient } from "mongodb";
import { faker } from '@faker-js/faker';
import { Booking } from "../models/Bookings"
import { Employee } from "../models/Employees";
import { Room } from "../models/Rooms";
import { Message } from "../models/Messages";

type data = typeof Message & typeof Room & typeof Employee & typeof Booking;

const connectToSeed = async (collectionName: string, dataToCreate: data) => {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection = client.db('miranda-dashboard').collection(collectionName);
        collection.drop();
        const dataSeed: data = ;
        collection.insertMany(dataSeed);
        for(let i = 0; i < 10; i++) {

        }
        client.close();
    } catch(error) {
        console.error(error);
    }
}
 

export const createNewBooking = () => {
    const booking = new Booking({
        _id: faker.string.uuid(),
        order_date: faker.date.past(),
        check_in: faker.date.past(),
        check_out: faker.date.past(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        full_name: faker.person.fullName(),
        special_request: faker.lorem.sentences(2),
        status: 'In Progress',
        room: {}
    });

    
}

export const createNewEmployee = async () => {

    const employee = new Employee({
        _id: faker.string.uuid(),
        full_name: faker.person.fullName(),
        photo: faker.image.avatar(),
        email: faker.internet.email(),
        contact: faker.phone.number(),
        job: 'Manager',
        start_date: faker.date.past(),
        description: faker.lorem.sentences(2),
        status: true,
        password: '',
    });
}

export const createNewRoom = () => {
    const room = new Room({
        _id: faker.string.uuid(),
        photo: [
            "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
            "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
            "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
        ],
        type: 'Single Bed',
        number: faker.number.int(),
        description: faker.lorem.sentences(2),
        offer: true,
        price: faker.number.int(),
        cancellation: faker.lorem.sentences(2),
        amenities: [
            "Shop near",
            "Kitchen",
            "Shower",
            "Towels",
            "Smart Security"],
        discount: faker.number.int(),
        status: 'Available'
    });
}


export const createNewMessage = () => {
    const message = new Message({
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
        time_passed: { type: String, required: true},
    });
}

