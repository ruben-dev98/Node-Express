export interface Room {
    id: number,
    foto: string,
    type: string,
    number: number,
    description: string,
    offer: boolean,
    price: number,
    cancellation: boolean,
    amenities: Array<string>,
    discount: number,
    status: string
}