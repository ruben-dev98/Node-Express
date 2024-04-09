import { faker } from "@faker-js/faker";
import { Room } from "../../models/Rooms";
import { IRoom } from "../../interfaces/Room";

const createNewRoom = (): IRoom => {
    return new Room({
        _id: faker.string.uuid(),
        photo: [
            "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
            "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
            "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
        ],
        type: faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Double Superior', 'Suite']),
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
        status: faker.helpers.arrayElement(['Available', 'Booked'])
    });
}

export const createRoomsToSeed = () => {
    const aData = [];
    for (let i = 0; i < 10; i++) {
        aData.push(createNewRoom());
    }
    return aData;
}