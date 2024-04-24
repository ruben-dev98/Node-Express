export const queryAllBookings = `SELECT booking._id,
booking.full_name,
booking.order_date, 
booking.check_in,
booking.check_out,
booking.special_request,
booking.status,
booking.discount,
booking.phone,
booking.email,
JSON_OBJECT('_id', room._id, 
'photo', photos.urls,
'type', room.type, 'number', room.number, 
'description', room.description, 'offer', room.offer, 'price', room.price,
'amenities', json_arrayagg(amenity.name),
'cancellation', room.cancellation, 'discount', room.discount, 'status', room.status) 'room'
FROM amenity
LEFT JOIN amenity_room on amenity_id = amenity._id
RIGHT JOIN room on amenity_room.room_id = room._id
INNER JOIN booking on booking.room_id = room._id
LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM mirandahotel.photo group by room_id) as photos on photos.id_room = room._id
GROUP BY booking._id;`;

export const queryOneBooking = `SELECT booking._id,
booking.full_name,
booking.order_date, 
booking.check_in,
booking.check_out,
booking.special_request,
booking.status,
booking.discount,
booking.phone,
booking.email,
JSON_OBJECT('_id', room._id, 
'photo', photos.urls,
'type', room.type, 'number', room.number, 
'description', room.description, 'offer', room.offer, 'price', room.price,
'amenities', json_arrayagg(amenity.name),
'cancellation', room.cancellation, 'discount', room.discount, 'status', room.status) 'room'
FROM amenity
LEFT JOIN amenity_room on amenity_id = amenity._id
RIGHT JOIN room on amenity_room.room_id = room._id
INNER JOIN booking on booking.room_id = room._id
LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM mirandahotel.photo group by room_id) as photos on photos.id_room = room._id
WHERE booking._id = ?
GROUP BY booking._id;`;

export const queryAllRoom = `SELECT room._id, 
room.type,
photos.urls 'photo',
room.number,
room.description, room.offer, room.price,
json_arrayagg(amenity.name) as amenities,
room.cancellation, room.discount, room.status
FROM amenity
LEFT JOIN amenity_room on amenity_id = amenity._id
RIGHT JOIN room on amenity_room.room_id = room._id
LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM mirandahotel.photo group by room_id) as photos on photos.id_room = room._id
GROUP BY room._id;`;;

export const queryOneRoom = `SELECT room._id, 
room.type,
photos.urls 'photo',
room.number,
room.description, room.offer, room.price,
json_arrayagg(amenity.name) as amenities,
room.cancellation, room.discount, room.status
FROM amenity
LEFT JOIN amenity_room on amenity_id = amenity._id
RIGHT JOIN room on amenity_room.room_id = room._id
LEFT JOIN (SELECT json_arrayagg(url) as urls, room_id as id_room FROM mirandahotel.photo group by room_id) as photos on photos.id_room = room._id
WHERE room._id = ?
GROUP BY room._id;`;