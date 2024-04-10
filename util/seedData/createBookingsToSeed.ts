import { faker } from "@faker-js/faker";
import { IBooking } from "../../interfaces/Booking";
import { IRoom } from "../../interfaces/Room";
import { Booking } from "../../models/Bookings";
import { randomRoomId } from "../getRandomIdFromRoom";

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
        status: faker.helpers.arrayElement(['In Progress', 'Check In', 'Check Out']),
        discount: faker.number.int({ min: 0, max: 100}),
        room: roomId
    });
}

export const createBookingsToSeed = (aRooms: IRoom[]) => {
    const aData = [];
    for (let i = 0; i < 10; i++) {
        aData.push(createNewBooking(aRooms));
    }
    return aData;
}





