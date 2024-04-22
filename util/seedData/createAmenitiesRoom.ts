import { Tables } from "../../interfaces/Tables";

export const AmenitiesRoomsTable: Tables[] = [
    {name: 'room_id', type: 'int NOT NULL', foreign: 'FOREIGN KEY (room_id) REFERENCES room(id)'},
    {name: 'amenities_id', type: 'int NOT NULL', foreign: 'FOREIGN KEY (amenities_id) REFERENCES amenities(id)'},
];





