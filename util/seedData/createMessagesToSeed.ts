import { Tables } from "../../interfaces/Tables";

export const MessagesTable: Tables[] = [
    { name: 'full_name', type: 'varchar(255)' },
    { name: 'email', type: 'varchar(255)' },
    { name: 'phone', type: 'varchar(255)' },
    { name: 'subject', type: 'varchar(255)' },
    { name: 'messages', type: 'varchar(3000)' },
    { name: 'date', type: 'varchar(255)' },
    { name: 'isRead', type: 'boolean' },
    { name: 'archived', type: 'boolean' },
    { name: 'photo', type: 'varchar(255)' },
    { name: 'time_passed', type: 'varchar(255)' },
];