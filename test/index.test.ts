import request from 'supertest';
import { app } from '../app';
import { generateAccessToken } from '../util/generateToken';
import { dataNotFoundError, forbiddenError, statusCodeCreated, statusCodeErrorNotFound, statusCodeForbidden, statusCodeOk, statusCodeUnauthorized, unauthorizedError } from '../util/constants';
import mongoose, { Types } from 'mongoose';
import { connection } from '../util/connection';

const token = `Bearer ${generateAccessToken('user', new Types.ObjectId('6618215216f13d21f8417973'))}`;
const token_mal_formatted = 'Bearer AAA';

describe('Booking Tests', () => {

    beforeAll(async () => {
        await mongoose.connection.close();
        await connection(true).catch(err => console.log(err));
    })

    afterAll(() => mongoose.connection.close());

    let idCreatedBooking = '661656210739da49670b4647';

    it('should not create a new booking and show a 401 Unauthorized error', async () => {
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
            discount: 20,
            room: '661695faf447c6e1705ed593'
        };
        const res = await request(app)
            .post('/bookings')
            .send(createdBooking)
        expect(res.statusCode).toEqual(statusCodeUnauthorized);
        expect(res.body).toMatchObject({ data: unauthorizedError });
    });

    it('should not edit a booking and show a 401 Unauthorized error', async () => {
        const editedBooking = {
            order_date: "1706788932000",
            check_in: "1677100679000",
            check_out: "1680520915000",
            email: "ghma@gmail.com",
            phone: "999888777",
            full_name: "Jacobo Disbrey",
            special_request: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
            status: "In Progress",
            discount: 20
        };
        const res = await request(app)
            .put(`/bookings/${idCreatedBooking}`)
            .send(editedBooking)
        expect(res.statusCode).toEqual(statusCodeUnauthorized);
        expect(res.body).toMatchObject({ data: unauthorizedError });
    });

    it('should not delete a booking and show a 401 Unauthorized error', async () => {
        const res = await request(app)
            .put(`/bookings/${idCreatedBooking}`);
        expect(res.statusCode).toEqual(statusCodeUnauthorized);
        expect(res.body).toMatchObject({ data: unauthorizedError });
    });

    it('should not create a new booking and show a 403 Forbidden error', async () => {
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
            discount: 20,
            room: '661695faf447c6e1705ed593'
        };
        const res = await request(app)
            .post('/bookings')
            .set({ authorization: token_mal_formatted })
            .send(createdBooking)
        expect(res.statusCode).toEqual(statusCodeForbidden);
        expect(res.body).toMatchObject({ data: forbiddenError });
    });

    it('should not edit a booking and show a 403 Forbidden error', async () => {
        const editedBooking = {
            order_date: "1706788932000",
            check_in: "1677100679000",
            check_out: "1680520915000",
            email: "ghma@gmail.com",
            phone: "999888777",
            full_name: "Jacobo Disbrey",
            special_request: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
            status: "In Progress",
            discount: 20
        };
        const res = await request(app)
            .put(`/bookings/${idCreatedBooking}`)
            .set({ authorization: token_mal_formatted })
            .send(editedBooking)
        expect(res.statusCode).toEqual(statusCodeForbidden);
        expect(res.body).toMatchObject({ data: forbiddenError });
    });

    it('should not delete a booking and show a 403 Forbidden error', async () => {
        const res = await request(app)
            .delete(`/bookings/${idCreatedBooking}`)
            .set({ authorization: token_mal_formatted })
        expect(res.statusCode).toEqual(statusCodeForbidden);
        expect(res.body).toMatchObject({ data: forbiddenError });
    });

    it('should create a new booking and show a 201 status with a match data', async () => {
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
            discount: 20,
            room: '6618215116f13d21f841795e'
        };

        const room = {
            _id: "6618215116f13d21f841795e",
            photo: [
                "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200"
            ],
            type: "Double Bed",
            number: 74,
            description: "Aeternus usque comptus esse. Cometes crur volaticus undique demens nostrum canis sapiente aureus vulgivagus.",
            offer: true,
            price: 1367,
            cancellation: "Adinventitias velociter sopor cernuus caelum ambitus. Stultus voluptatibus cultellus.",
            amenities: [
                "Shop near",
                "Kitchen",
                "Shower",
                "Towels",
                "Smart Security"
            ],
            discount: 23,
            status: "Booked"
        };

        const dataRetrieved = {
            ...createdBooking,
            room: room
        };

        const res = await request(app)
            .post('/bookings')
            .set({ authorization: token })
            .send(createdBooking);
        expect(res.statusCode).toEqual(statusCodeCreated);
        expect(res.body).toMatchObject({ data: dataRetrieved });
    });

    it('should get a booking and show a 200 status with a match data', async () => {
        const booking = {
            _id: idCreatedBooking,
            order_date: "1706788932000",
            check_in: "1677100679000",
            check_out: "1680520915000",
            email: "ghma@gmail.com",
            phone: "999888777",
            full_name: "Jacobo Disbrey",
            special_request: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
            status: "In Progress",
            discount: 20
        };

        const room = {
            _id: "6618215116f13d21f841795e",
            photo: [
                "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200"
            ],
            type: "Double Bed",
            number: 74,
            description: "Aeternus usque comptus esse. Cometes crur volaticus undique demens nostrum canis sapiente aureus vulgivagus.",
            offer: true,
            price: 1367,
            cancellation: "Adinventitias velociter sopor cernuus caelum ambitus. Stultus voluptatibus cultellus.",
            amenities: [
                "Shop near",
                "Kitchen",
                "Shower",
                "Towels",
                "Smart Security"
            ],
            discount: 23,
            status: "Booked"
        };

        const dataRetrieved = {
            ...booking,
            room: room
        };

        const res = await request(app)
            .get(`/bookings/${idCreatedBooking}`)
            .set({ authorization: token })
        expect(res.statusCode).toEqual(statusCodeOk);
        expect(res.body).toMatchObject({ data: dataRetrieved });
    });

    it('should edit a booking and show a 200 status with a match data', async () => {
        const editedBooking = {
            order_date: "17067889320",
            check_in: "167710067900",
            check_out: "168052091500",
            email: "algo@gmail.com",
            phone: "777888777",
            full_name: "AAAA",
            special_request: "Vestid ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
            status: "Check Out",
            discount: 25,
        };

        const room = {
            _id: "6618215116f13d21f841795e",
            photo: [
                "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200"
            ],
            type: "Double Bed",
            number: 74,
            description: "Aeternus usque comptus esse. Cometes crur volaticus undique demens nostrum canis sapiente aureus vulgivagus.",
            offer: true,
            price: 1367,
            cancellation: "Adinventitias velociter sopor cernuus caelum ambitus. Stultus voluptatibus cultellus.",
            amenities: [
                "Shop near",
                "Kitchen",
                "Shower",
                "Towels",
                "Smart Security"
            ],
            discount: 23,
            status: "Booked"
        };

        const dataRetrieved = {
            ...editedBooking,
            room: room
        }

        const res = await request(app)
            .put(`/bookings/${idCreatedBooking}`)
            .set({ authorization: token })
            .send(editedBooking);
        expect(res.statusCode).toEqual(statusCodeOk);
        expect(res.body).toMatchObject({ data: dataRetrieved });
    });

    it('should get a booking and show a 200 status with a match data', async () => {
        const booking = {
            _id: idCreatedBooking,
            order_date: "17067889320",
            check_in: "167710067900",
            check_out: "168052091500",
            email: "algo@gmail.com",
            phone: "777888777",
            full_name: "AAAA",
            special_request: "Vestid ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
            status: "Check Out",
        };

        const room = {
            _id: "6618215116f13d21f841795e",
            photo: [
                "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200",
                "https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg5ODJ8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwcm9vbXxlbnwwfHx8fDE3MDk4MDU3MDF8MA&ixlib=rb-4.0.3&q=80&w=200"
            ],
            type: "Double Bed",
            number: 74,
            description: "Aeternus usque comptus esse. Cometes crur volaticus undique demens nostrum canis sapiente aureus vulgivagus.",
            offer: true,
            price: 1367,
            cancellation: "Adinventitias velociter sopor cernuus caelum ambitus. Stultus voluptatibus cultellus.",
            amenities: [
                "Shop near",
                "Kitchen",
                "Shower",
                "Towels",
                "Smart Security"
            ],
            discount: 23,
            status: "Booked"
        };

        const dataRetrieved = {
            ...booking,
            room: room
        };

        const res = await request(app)
            .get(`/bookings/${idCreatedBooking}`)
            .set({ authorization: token })
        expect(res.statusCode).toEqual(statusCodeOk);
        expect(res.body).toMatchObject({ data: dataRetrieved });

    });

    it('should delete a booking and show a 200 status with a match data', async () => {
        const booking = {
            _id: idCreatedBooking,
            order_date: "17067889320",
            check_in: "167710067900",
            check_out: "168052091500",
            email: "algo@gmail.com",
            phone: "777888777",
            full_name: "AAAA",
            special_request: "Vestid ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
            status: "Check Out",
        };
        const res = await request(app)
            .delete(`/bookings/${idCreatedBooking}`)
            .set({ authorization: token });
        expect(res.statusCode).toEqual(statusCodeOk);
        expect(res.body).toMatchObject({ data: booking });
    });

    it('should not get a booking and show a 404 status with an error message', async () => {
        const res = await request(app)
            .get(`/bookings/${idCreatedBooking}`)
            .set({ authorization: token })
        expect(res.statusCode).toEqual(statusCodeErrorNotFound);
        expect(res.body).toMatchObject({ data: dataNotFoundError });
    });


});