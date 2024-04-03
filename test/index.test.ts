import request from 'supertest';
import { app } from '../app';

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNzEyMTM3MzI1LCJleHAiOjIwMjc3MTMzMjV9.-xNu5itJ_xikRYJww8zXuJwEagVdp1xj13iD_97g0Ks';
const token_mal_formatted = 'Bearer eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzEyMDU5NTQzLCJleHAiOjIwMjc2MzU1NDN9.GZZuriKAYAvaxTlFPthw2Sx1qBC_wk-vSB5DXeR20Ds';

describe('Booking Tests', () => {
    
    it('should not create a new booking and show a 401 Unauthorized error', async () => {
        const res = await request(app)
            .post('/bookings')
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
        expect(res.statusCode).toEqual(401);
        expect(res.body).toMatchObject({data: "Unauthorized. The request lacks basic authentication"});
    });

    it('should not edit a booking and show a 401 Unauthorized error', async () => {
        const res = await request(app)
            .put('/bookings/30')
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
            .put('/bookings/30');
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
            .put('/bookings/31')
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
            .delete('/bookings/31')
            .set({authorization: token_mal_formatted})
        expect(res.statusCode).toEqual(403);
        expect(res.body).toMatchObject({data: 'Forbidden. The server understood the request but refused to authorize it.'});
    });

    it('should create a new booking and show a 200 status with a successfully message', async () => {
        const res = await request(app)
            .post('/bookings')
            .set({authorization: token})
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
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({data: 'Booking #31 successfully added'});
    });

    it('should edit a booking and show a 200 status with a successfully message', async () => {
        const res = await request(app)
            .put('/bookings/31')
            .set({authorization: token})
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
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({data: 'Booking #31 successfully edited'});
    });

    it('should delete a booking and show a 200 status with a successfully message', async () => {
        const res = await request(app)
            .delete('/bookings/31')
            .set({authorization: token})
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({data: 'Booking #31 deleted successfully'});
    });
})
