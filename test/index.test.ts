import request from 'supertest';
import { app } from '../app';
import { generateAccessToken } from '../util/generateToken';

const token = `Bearer ${generateAccessToken('user', 'admin')}`;
const token_mal_formatted = 'Bearer AAA';

describe('Booking Tests', () => {

    let idCreatedBooking = '661656210739da49670b4647';
    
    it('should not create a new booking and show a 401 Unauthorized error', async () => {
        const res = await request(app)
            .post('/bookings')
            .send({
                full_name: "Jacobo Disbrey",
                order_date: "1706788932000",
                check_in: "1677100679000",
                check_out: "1680520915000",
                special_request: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
                number: 51,
                price: 477.7,
                type: "Double Bed",
                status: "In Progress",
                amenities: ["Expert Team", "Smart Security", "Shower"],
                room_status: "Booked",
                foto: "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                description: "Etiam faucibus cursus urna. Ut tellus.",
                phone: "999888777",
                email: "ghma@gmail.com"
            })
        expect(res.statusCode).toEqual(401);
        expect(res.body).toMatchObject({data: "Unauthorized. The request lacks basic authentication"});
    });

    it('should not edit a booking and show a 401 Unauthorized error', async () => {
        const res = await request(app)
            .put('/bookings/661656210739da49670b4689')
            .send({
                id: 30,
                full_name: "Jacobo Disbrey",
                order_date: "1706788932000",
                check_in: "1677100679000",
                check_out: "1680520915000",
                special_request: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
                number: 51,
                price: 477.7,
                type: "Double Bed",
                status: "In Progress",
                amenities: ["Expert Team", "Smart Security", "Shower"],
                room_status: "Booked",
                foto: "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                description: "Etiam faucibus cursus urna. Ut tellus.",
                phone: "999888777",
                email: "ghma@gmail.com"
            })
        expect(res.statusCode).toEqual(401);
        expect(res.body).toMatchObject({data: "Unauthorized. The request lacks basic authentication"});
    });
    
    it('should not delete a booking and show a 401 Unauthorized error', async () => {
        const res = await request(app)
            .put('/bookings/661656210739da49670b4689');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toMatchObject({data: "Unauthorized. The request lacks basic authentication"});
    });

    it('should not create a new booking and show a 403 Forbidden error', async () => {
        const res = await request(app)
            .post('/bookings')
            .set({authorization: token_mal_formatted})
            .send({
                id: 31,
                full_name: "Jacobo Disbrey",
                order_date: "1706788932000",
                check_in: "1677100679000",
                check_out: "1680520915000",
                special_request: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
                number: 51,
                price: 477.7,
                type: "Double Bed",
                status: "In Progress",
                amenities: ["Expert Team", "Smart Security", "Shower"],
                room_status: "Booked",
                foto: "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                description: "Etiam faucibus cursus urna. Ut tellus.",
                phone: "999888777",
                email: "ghma@gmail.com"
            })
        expect(res.statusCode).toEqual(403);
        expect(res.body).toMatchObject({data: 'Forbidden. The server understood the request but refused to authorize it.'});
    });

    it('should not edit a booking and show a 403 Forbidden error', async () => {
        const res = await request(app)
            .put('/bookings/661656210739da49670b4689')
            .set({authorization: token_mal_formatted})
            .send({
                id: 31,
                full_name: "AAAA",
                order_date: "17067889320",
                check_in: "167710067900",
                check_out: "168052091500",
                special_request: "Vestid ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
                number: 45,
                price: 250.7,
                type: "Single Bed",
                status: "Check Out",
                amenities: ["Expert Team", "Smart Security", "Shower"],
                room_status: "Available",
                foto: "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                description: "Etiam. Ut tellus.",
                phone: "777888777",
                email: "algo@gmail.com"
            })
        expect(res.statusCode).toEqual(403);
        expect(res.body).toMatchObject({data: 'Forbidden. The server understood the request but refused to authorize it.'});
    });

    it('should not delete a booking and show a 403 Forbidden error', async () => {
        const res = await request(app)
            .delete('/bookings/661656210739da49670b4689')
            .set({authorization: token_mal_formatted})
        expect(res.statusCode).toEqual(403);
        expect(res.body).toMatchObject({data: 'Forbidden. The server understood the request but refused to authorize it.'});
    });

    it('should create a new booking and show a 201 status with a successfully message', async () => {
        console.log(idCreatedBooking);
        const createdBooking = {
            _id: idCreatedBooking,
            order_date: "1706788932000",
            check_in: "1677100679000",
            check_out: "1680520915000",
            email: "ghma@gmail.com",
            phone: "999888777",
            full_name: "Jacobo Disbrey",
            special_request: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
            status: "In Progress",
            room: '661656200739da49670b4663'
        };
        const dataRetrieved = {
            ...createdBooking,
            room: {
                _id: "661656200739da49670b4663",
                amenities:  [
                    "Shop near",
                    "Kitchen",
                    "Shower",
                    "Towels",
                    "Smart Security",
                ],
                cancellation: "Ancilla ratione suasoria laborum theca tenuis. Subiungo cohors abduco ars aggero amet.",
                description: "Campana tibi sequi desparatus tutis ducimus una absorbeo undique. Peccatus absum cado tamdiu facere adficio vacuus dolor.",
                discount: 19,
                number: 39,
                offer: true,
                photo: [
                    "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                    "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                    "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                ],
                price: 657,
                status: "Booked",
                type: "Double Bed",
            }
        }
        const res = await request(app)
            .post('/bookings')
            .set({authorization: token})
            .send(createdBooking);
            console.log(res)
        expect(res.statusCode).toEqual(201);
        expect(res.body).toMatchObject({data: dataRetrieved});
    });

    it('should edit a booking and show a 200 status with a successfully message', async () => {
        const editedBooking = {
            order_date: "17067889320",
            check_in: "167710067900",
            check_out: "168052091500",
            email: "algo@gmail.com",
            phone: "777888777",
            full_name: "AAAA",
            special_request: "Vestid ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
            status: "Check Out",
        };
        const dataRetrieved = {
            ...editedBooking,
            room: {
                _id: "661656200739da49670b4663",
                amenities:  [
                    "Shop near",
                    "Kitchen",
                    "Shower",
                    "Towels",
                    "Smart Security",
                ],
                cancellation: "Ancilla ratione suasoria laborum theca tenuis. Subiungo cohors abduco ars aggero amet.",
                description: "Campana tibi sequi desparatus tutis ducimus una absorbeo undique. Peccatus absum cado tamdiu facere adficio vacuus dolor.",
                discount: 19,
                number: 39,
                offer: true,
                photo: [
                    "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                    "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                    "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                ],
                price: 657,
                status: "Booked",
                type: "Double Bed",
            }
        }
        const res = await request(app)
            .put(`/bookings/${idCreatedBooking}`)
            .set({authorization: token})
            .send(editedBooking);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({data: dataRetrieved});
        
    });

    it('should delete a booking and show a 200 status with a successfully message', async () => {
        const res = await request(app)
            .delete(`/bookings/${idCreatedBooking}`)
            .set({authorization: token});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({data: 'Success'});
    });
});
