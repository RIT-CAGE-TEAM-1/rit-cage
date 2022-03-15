const pool = require('./db');

class ReservationItemModel {

    static async create(reservationId, itemId, connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = 'INSERT INTO reservation_item(reservation_id, item_id) VALUES (?, ?)';
            await mysql.query(stmt, [ reservationId, itemId ]);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = ReservationItemModel;