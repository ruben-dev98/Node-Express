import { close, connection } from "./connection";
import { createTableAmenity } from "./seedData/createTableAmenity";
import { createTableAmenityRoom } from "./seedData/createTableAmenityRoom";
import { createTableBooking } from "./seedData/createTableBooking";
import { createTableRoom } from "./seedData/createTableRoom";
import { createTableEmployee } from "./seedData/createTableEmployee";
import { createTableMessage } from "./seedData/createTableMessage";
import { createTablePhoto } from "./seedData/createTablePhoto";

const main = async () => {
    const conn = await connection();
    try {
        createTableAmenity(conn);
        createTableRoom(conn);
        createTableEmployee(conn);
        createTableMessage(conn);
        createTableBooking(conn);
        createTablePhoto(conn);
        createTableAmenityRoom(conn);
    } catch (error) {
        conn.rollback();
        close(conn);
        console.error(error);
    } finally {
        conn.commit();
        close(conn);
    }
}

main();