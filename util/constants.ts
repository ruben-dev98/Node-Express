export const bookingFile = './data/bookings.json';
export const roomFile = './data/rooms.json';
export const employeeFile = './data/employees.json';
export const messageFile = './data/messages.json';

export const invalidDataError = 'Input data could have spelling problems or is empty';
export const dataNotFoundError = 'Data could not be found';
export const internalServerError = 'Internal Server Error';
export const unauthorizedError = 'Unauthorized. The request lacks basic authentication';
export const forbiddenError = 'Forbidden. The server understood the request but refused to authorize it.';
export const successMessage = 'Success';
export const origins = ['http://localhost:5173', 'http://dashboard-miranda-hotel.s3-website.eu-west-3.amazonaws.com'];

export const ONE_HUNDRED = 100;
export const FOURTEEN = 14;
export const FIVE = 5;
export const THREE = 3;
export const ONE = 1;
export const ZERO = 0;

export const amenities: string[] = ['Breakfast', 'Smart Security', 'Strong Locker', 'Shower', '24/7 Online Support', 'Kitchen', 'Cleaning', 'Expert Team', 'High Speed Wifi', 'Air Conditioner', 'Towels', 'Grocery', 'Single Bed', 'Shop Near'];
export const roomTypes: string[] = ['Single Bed', 'Double Bed', 'Double Superior', 'Suite'];
export const roomStatus: string[] = ['Available', 'Booked'];
export const employeeJobs: string[] = ['Receptionist', 'Manager', 'Room Service'];
export const bookingStatus: string[] = ['Check In', 'Check Out', 'In Progress'];

export const statusCodeErrorNotFound = 404;
export const statusCodeUnauthorized = 401;
export const statusCodeForbidden = 403;
export const statusCodeInvalidData = 400;

export const statusCodeCreated = 201;
export const statusCodeOk = 200;

export const statusCodeInternalServerError = 500;

export const tableRoom = 'room';
export const tableBooking = 'booking';
export const tableEmployee = 'employee';
export const tableMessage = 'message';
export const tablePhoto = 'photo';
export const tableAmenity = 'amenity';
export const tableAmenityRoom = 'amenity_room';