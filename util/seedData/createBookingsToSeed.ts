import { Tables } from "../../interfaces/Tables";

export const BookingTable: Tables[] = [
    { name: 'full_name', type: 'varchar(255)' },
    { name: 'order_date', type: 'varchar(255)' },
    { name: 'check_in', type: 'varchar(255)' },
    { name: 'check_out', type: 'varchar(255)' },
    { name: 'special_request', type: 'varchar(3000)' },
    { name: 'status', type: 'varchar(255)' },
    { name: 'discount', type: 'int' },
    { name: 'phone', type: 'varchar(255)' },
    { name: 'email', type: 'varchar(255)' },
    { name: 'room_id', type: 'int', foreign: 'FOREIGN KEY (room_id) REFERENCES room(id)' }
];





