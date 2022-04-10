const pool = require('./db');

class ReservationItemModel {

    static async create(newReservationItem, connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = 'INSERT INTO reservation_item SET ?';
            await mysql.query(stmt, [ newReservationItem ]);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = ReservationItemModel;