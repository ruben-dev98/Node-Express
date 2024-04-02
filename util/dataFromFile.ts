import fs from 'fs';
import { Booking } from '../interfaces/Booking';
import { Room } from '../interfaces/Room';
import { Employee } from '../interfaces/Employee';
import { Message } from '../interfaces/Message';

export const readFromDataFromFile = (fileName: string): Booking[] | Room[] | Employee[] | Message[] => {
    const data = fs.readFileSync(fileName).toString();
    const aData = JSON.parse(data);
    return aData;
}

export const writeFromDataFromFile = (fileName: string, data: string): void => {
    fs.writeFileSync(fileName, data);
}