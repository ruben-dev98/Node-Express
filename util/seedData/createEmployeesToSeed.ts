import { faker } from "@faker-js/faker";
import { Employee } from "../../models/Employees";
import { hashPassword } from "../cryptPassword";
import { IEmployee } from "../../interfaces/Employee";

const createNewEmployee = (): IEmployee => {
    let passwordHash = hashPassword('admin');
    return new Employee({
        _id: faker.string.uuid(),
        full_name: faker.person.fullName(),
        photo: faker.image.avatarGitHub(),
        email: faker.internet.email(),
        contact: faker.phone.number(),
        job: faker.helpers.arrayElement(['Manager', 'Recepción', 'Servicio de Habitaciones']),
        start_date: faker.date.past().getTime(),
        description: faker.lorem.sentences(2),
        status: true,
        password: passwordHash
    });
}

export const createEmployeesToSeed = () => {
    const aData = [];
    let passwordHash = hashPassword('admin');
    for (let i = 0; i < 10; i++) {
        aData.push(createNewEmployee());
    }
    aData.push(new Employee({
        _id: faker.string.uuid(),
        full_name: 'Ruben Dopico Novo',
        photo: faker.image.avatarGitHub(),
        email: 'ruben.dopico.dev@gmail.com',
        contact: '620585858',
        job: faker.helpers.arrayElement(['Manager', 'Recepción', 'Servicio de Habitaciones']),
        start_date: faker.date.past().getTime(),
        description: faker.lorem.sentences(2),
        status: true,
        password: passwordHash
    }));
    return aData;
}