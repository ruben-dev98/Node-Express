import { IRoom } from "../interfaces/Room";

export const randomRoomId = (rooms: IRoom[]) => {
    const randomNumber = Math.round(Math.random() * (rooms.length - 1));
    return rooms[randomNumber]._id;
}