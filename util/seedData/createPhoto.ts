import { Tables } from "../../interfaces/Tables";

export const PhotoTable: Tables[] = [
    {name: 'url', type: 'varchar(500)'},
    {name: 'room_id', type: 'int', foreign: 'FOREIGN KEY (room_id) REFERENCES room(id)'}
];