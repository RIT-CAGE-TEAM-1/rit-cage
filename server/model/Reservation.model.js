const pool = require('./db');

class ReservationModel {

    static async create(reservation, connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = 'INSERT INTO reservation SET ?';
            const results = await mysql.query(stmt, reservation);

            return results[0].insertId;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getAllReservations(conn=null) {
        try {
            const mysql = conn? conn : pool;

            const stmt = `SELECT 
                reservation.*,
                item.*,
                item_model.*
            FROM reservation 
            INNER JOIN reservation_item ON reservation.reservation_id = reservation_item.reservation_id
            INNER JOIN item ON reservation_item.item_id = item.item_id
            INNER JOIN item_model ON item.item_model_id = item_model.item_model_id
            ORDER BY reservation_date DESC`;
            
            const results = await mysql.query(stmt);

            return results[0];
        } catch (error) { throw new Error(error); }
    }
    
    static async getRecentsByDay(connection=null) {
        try {
            const mysql = connection? connection : pool;

            const stmt = `SELECT 
                    COUNT(*) AS count, 
                    DATE_FORMAT(reservation_date, '%Y-%m-%d') AS date 
                FROM reservation 
                WHERE CURDATE() > reservation_date 
                GROUP BY date 
                ORDER BY date DESC`;
            
            const results = await mysql.query(stmt);

            return results[0];
        } catch (error) { throw new Error(error); }
    }
}

module.exports = ReservationModel;