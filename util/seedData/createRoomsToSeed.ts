import { Tables } from "../../interfaces/Tables";

export const RoomsTable: Tables[] = [
    { name: 'type', type: 'varchar(255)' },
    { name: 'number', type: 'int' },
    { name: 'description', type: 'varchar(3000)' },
    { name: 'offer', type: 'boolean' },
    { name: 'price', type: 'int' },
    { name: 'cancellation', type: 'varchar(3000)' },
    { name: 'discount', type: 'int' },
    { name: 'status', type: 'varchar(3000)' }
];