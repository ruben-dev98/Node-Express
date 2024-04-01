export interface Booking {
    id: number,
    full_name: string,
    order_date: string,
    check_in: string,
    check_out: string,
    special_request: string,
    number: number,
    price: number,
    type: string,
    status: string,
    amenities: Array<string>,
    room_status: string,
    foto: string,
    description: string,
    phone: string,
    email: string
}