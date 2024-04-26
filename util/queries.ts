import { tableAmenity, tableAmenityRoom, tableBooking, tableEmployee, tableMessage, tablePhoto, tableRoom } from "./constants";

export const queryAllBookings = `SELECT ${tableBooking}._id,
${tableBooking}.full_name,
${tableBooking}.order_date, 
${tableBooking}.check_in,
${tableBooking}.check_out,
${tableBooking}.special_request,
${tableBooking}.status,
${tableBooking}.discount,
${tableBooking}.phone,
${tableBooking}.email,
JSON_OBJECT('_id', ${tableRoom}._id, 
'photo', photos.urls,
'type', ${tableRoom}.type, 'number', ${tableRoom}.number, 
'description', ${tableRoom}.description, 'offer', ${tableRoom}.offer, 'price', ${tableRoom}.price,
'amenities', json_arrayagg(${tableAmenity}.name),
'cancellation', ${tableRoom}.cancellation, 'discount', ${tableRoom}.discount, 'status', ${tableRoom}.status) 'room'
FROM ${tableAmenity}
LEFT JOIN ${tableAmenityRoom} on amenity_id = ${tableAmenity}._id
RIGHT JOIN ${tableRoom} on ${tableAmenityRoom}.room_id = ${tableRoom}._id
INNER JOIN ${tableBooking} on ${tableBooking}.room_id = ${tableRoom}._id
LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM ${tablePhoto} group by room_id) as photos on photos.id_room = ${tableRoom}._id
GROUP BY ${tableBooking}._id;`

export const queryOneBooking = `SELECT ${tableBooking}._id,
${tableBooking}.full_name,
${tableBooking}.order_date, 
${tableBooking}.check_in,
${tableBooking}.check_out,
${tableBooking}.special_request,
${tableBooking}.status,
${tableBooking}.discount,
${tableBooking}.phone,
${tableBooking}.email,
JSON_OBJECT('_id', ${tableRoom}._id, 
'photo', photos.urls,
'type', ${tableRoom}.type, 'number', ${tableRoom}.number, 
'description', ${tableRoom}.description, 'offer', ${tableRoom}.offer, 'price', ${tableRoom}.price,
'amenities', json_arrayagg(${tableAmenity}.name),
'cancellation', ${tableRoom}.cancellation, 'discount', ${tableRoom}.discount, 'status', ${tableRoom}.status) 'room'
FROM ${tableAmenity}
LEFT JOIN ${tableAmenityRoom} on amenity_id = ${tableAmenity}._id
RIGHT JOIN ${tableRoom} on ${tableAmenityRoom}.room_id = ${tableRoom}._id
INNER JOIN ${tableBooking} on ${tableBooking}.room_id = ${tableRoom}._id
LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM ${tablePhoto} group by room_id) as photos on photos.id_room = ${tableRoom}._id
WHERE ${tableBooking}._id = ?
GROUP BY ${tableBooking}._id;`;

export const queryOneBookingByRoomNumber = `SELECT ${tableBooking}._id,
${tableBooking}.full_name,
${tableBooking}.order_date, 
${tableBooking}.check_in,
${tableBooking}.check_out,
${tableBooking}.special_request,
${tableBooking}.status,
${tableBooking}.discount,
${tableBooking}.phone,
${tableBooking}.email,
JSON_OBJECT('_id', ${tableRoom}._id, 
'photo', photos.urls,
'type', ${tableRoom}.type, 'number', ${tableRoom}.number, 
'description', ${tableRoom}.description, 'offer', ${tableRoom}.offer, 'price', ${tableRoom}.price,
'amenities', json_arrayagg(${tableAmenity}.name),
'cancellation', ${tableRoom}.cancellation, 'discount', ${tableRoom}.discount, 'status', ${tableRoom}.status) 'room'
FROM ${tableAmenity}
LEFT JOIN ${tableAmenityRoom} on amenity_id = ${tableAmenity}._id
RIGHT JOIN ${tableRoom} on ${tableAmenityRoom}.room_id = ${tableRoom}._id
INNER JOIN ${tableBooking} on ${tableBooking}.room_id = ${tableRoom}._id
LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM ${tablePhoto} group by room_id) as photos on photos.id_room = ${tableRoom}._id
WHERE ${tableRoom}.number = ?
GROUP BY ${tableBooking}._id;
`;

export const queryInsertIntoBooking = `INSERT INTO ${tableBooking} (full_name, order_date, check_in, check_out, special_request, status, discount, phone, email, room_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
export const queryUpdateBooking = `UPDATE ${tableBooking} SET full_name = ?, order_date = ?, check_in = ?, check_out = ?, special_request = ?, status = ?, discount = ?, phone = ?, email = ?, room_id = ? WHERE _id = ?;`;
export const queryDeleteBooking = `DELETE FROM ${tableBooking} WHERE _id = ?`;

export const queryAllRoom = `SELECT ${tableRoom}._id, 
${tableRoom}.type,
photos.urls 'photo',
${tableRoom}.number,
${tableRoom}.description, ${tableRoom}.offer, ${tableRoom}.price,
json_arrayagg(${tableAmenity}.name) as amenities,
${tableRoom}.cancellation, ${tableRoom}.discount, ${tableRoom}.status
FROM ${tableAmenity}
LEFT JOIN amenity_room on amenity_id = ${tableAmenity}._id
RIGHT JOIN ${tableRoom} on amenity_room.room_id = room._id
LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM mirandahotel.photo group by room_id) as photos on photos.id_room = ${tableRoom}._id
GROUP BY ${tableRoom}._id;`;

export const queryOneRoom = `SELECT ${tableRoom}._id, 
${tableRoom}.type,
photos.urls 'photo',
${tableRoom}.number,
${tableRoom}.description, ${tableRoom}.offer, ${tableRoom}.price,
json_arrayagg(${tableAmenity}.name) as amenities,
${tableRoom}.cancellation, ${tableRoom}.discount, ${tableRoom}.status
FROM ${tableAmenity}
LEFT JOIN ${tableAmenityRoom} on amenity_id = ${tableAmenity}._id
RIGHT JOIN ${tableRoom} on ${tableAmenityRoom}.room_id = ${tableRoom}._id
LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM ${tablePhoto} group by room_id) as photos on photos.id_room = ${tableRoom}._id
WHERE ${tableRoom}._id = ?
GROUP BY ${tableRoom}._id;`;

export const queryOneRoomByNumber = `SELECT ${tableRoom}._id, 
${tableRoom}.type,
photos.urls 'photo',
${tableRoom}.number,
${tableRoom}.description, ${tableRoom}.offer, ${tableRoom}.price,
json_arrayagg(${tableAmenity}.name) as amenities,
${tableRoom}.cancellation, ${tableRoom}.discount, ${tableRoom}.status
FROM ${tableAmenity}
LEFT JOIN ${tableAmenityRoom} on amenity_id = ${tableAmenity}._id
RIGHT JOIN ${tableRoom} on ${tableAmenityRoom}.room_id = ${tableRoom}._id
LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM ${tablePhoto} group by room_id) as photos on photos.id_room = ${tableRoom}._id
WHERE ${tableRoom}.number = ?
GROUP BY ${tableRoom}._id;`

export const queryInsertIntoRoom = `INSERT INTO ${tableRoom} (type, number, description, offer, price, cancellation, discount, status) values (?, ?, ?, ?, ?, ?, ?, ?);`;
export const queryUpdateRoom = `UPDATE ${tableRoom} SET type = ?, number = ?, description = ?, offer = ?, price = ?, cancellation = ?, discount = ?, status = ? WHERE _id = ?;`;
export const queryDeleteRoom = `DELETE FROM ${tableRoom} WHERE _id = ?`;


export const queryAllMessage = `SELECT _id, full_name, email, phone, subject, messages, date, is_read as 'read', archived, photo, time_passed 
FROM ${tableMessage};`;
export const queryOneMessage = `SELECT _id, full_name, email, phone, subject, messages, date, is_read as 'read', archived, photo, time_passed 
FROM ${tableMessage} WHERE _id = ?;`;

export const queryInsertIntoMessage = `INSERT INTO ${tableMessage} (full_name, email, phone, subject, messages, date, is_read, archived, photo, time_passed) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
export const queryUpdateMessage = `UPDATE ${tableMessage} SET full_name = ?, email = ?, phone = ?, subject = ?, messages = ?, date = ?, is_read = ?, archived = ?, photo = ?, time_passed = ? WHERE _id = ?;`;
export const queryDeleteMessage = `DELETE FROM ${tableMessage} WHERE _id = ?;`;

export const queryAllEmployee = `SELECT * FROM ${tableEmployee};`;
export const queryOneEmployee = `SELECT * FROM ${tableEmployee} WHERE _id = ?;`;
export const queryOneEmployeeByEmail = `SELECT * FROM ${tableEmployee} WHERE email = ?;`;

export const queryInsertIntoEmployee = `INSERT INTO ${tableEmployee} (photo, full_name, email, start_date, description, job, contact, status, password) values (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
export const queryUpdateEmployee = `UPDATE ${tableEmployee} SET photo = ?, full_name = ?, email = ?, start_date = ?, description = ?, job = ?, contact = ?, status = ?, password = ? WHERE _id = ?;`;
export const queryDeleteEmployee = `DELETE FROM ${tableEmployee} WHERE _id = ?;`;

export const queryInsertIntoPhoto = `INSERT INTO ${tablePhoto} (url, room_id) values (?, ?);`;
export const queryInsertIntoAmenity = `INSERT INTO ${tableAmenity} (name) values (?);`;
export const queryInsertIntoAmenityRoom = `INSERT INTO ${tableAmenityRoom} (room_id, amenity_id) values (?, ?);`;