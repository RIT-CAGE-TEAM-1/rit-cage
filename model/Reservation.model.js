const pool = require('./db');

class Reservation {
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

module.exports = Reservation;