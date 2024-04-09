import { faker } from "@faker-js/faker";
import { Message } from "../../models/Messages";
import { IMessage } from "../../interfaces/Message";

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

export const createMessagesToSeed = () => {
    const aData = [];
    for (let i = 0; i < 10; i++) {
        aData.push(createNewMessage());
    }
    return aData;
}