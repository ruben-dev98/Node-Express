import { faker } from "@faker-js/faker";
import { Employee } from "../../models/Employees";
import { hashPassword } from "../cryptPassword";
import { IEmployee } from "../../interfaces/Employee";

const createNewEmployee = (): IEmployee => {
    let passwordHash = hashPassword('admin');
    return new Employee({
        _id: faker.string.uuid(),
        full_name: faker.person.fullName(),
        photo: faker.image.avatar(),
        email: faker.internet.email(),
        contact: faker.phone.number(),
        job: faker.helpers.arrayElement(['', '', '']),
        start_date: faker.date.past().getTime(),
        description: faker.lorem.sentences(2),
        status: true,
        password: passwordHash
    });
}

export const createEmployeesToSeed = () => {
    const aData = [];
    for (let i = 0; i < 10; i++) {
        aData.push(createNewEmployee());
    }
    return aData;
}