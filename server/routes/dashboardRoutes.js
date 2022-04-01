const router = require('express').Router();
const pool = require('../model/db');
const Reservation = require('../model/Reservation.model');

router.get('/', async (req, res, next) => {
    try {
        let stmt = '';
        let results = null;

        const conn = await pool.getConnection();
        
        // active rentees
        stmt = `SELECT COUNT(*) AS count FROM reservation WHERE status = 'out'`;
        results = await conn.query(stmt);
        activeRentees = results[0][0];

        // rented items
        stmt = `SELECT COUNT(*) AS count FROM reservation WHERE status = 'reserved'`;
        results = await conn.query(stmt);
        rentedItems = results[0][0];

        // peak reservation hours
        stmt = 'SELECT HOUR(reservation_date) AS hour, COUNT(*) AS count FROM reservation GROUP BY hour ORDER BY hour ASC';
        results = await conn.query(stmt);
        peakReservationHours = results[0];

        // most frequently reserved items
        stmt = `SELECT 
            item_model.model_name,
            COUNT(*) AS count
        FROM reservation 
        INNER JOIN reservation_item USING(reservation_id) 
        INNER JOIN item USING(item_model_id) 
        INNER JOIN item_model USING(item_model_id) 
        GROUP BY item_model_id
        ORDER BY count DESC
        LIMIT 10`;
        results = await conn.query(stmt);
        frequentlyReservedItems = results[0];

        stmt = `SELECT 
            reservation.reservation_date,
            item_model.model_name,
            item.serial,
            item.item_condition,
            user.username 
        FROM reservation 
        INNER JOIN reservation_item USING(reservation_id)
        INNER JOIN item USING(item_id)
        INNER JOIN item_model ON item.item_model_id = item_model.item_model_id
        INNER JOIN user USING(user_id)
        WHERE reservation_date < CURDATE() 
            AND checkout_date < CURDATE() 
            AND status = 'out'`;
        results = await conn.query(stmt);
        overdueItems = results[0];

        stmt = `SELECT 
            reservation.reservation_date,
            item_model.model_name,
            item.serial,
            item.item_condition,
            user.username 
        FROM reservation 
        INNER JOIN reservation_item USING(reservation_id)
        INNER JOIN item USING(item_id)
        INNER JOIN item_model ON item.item_model_id = item_model.item_model_id
        INNER JOIN user USING(user_id)
        WHERE reservation_date > CURDATE()
            AND status = 'reserved'`;
        results = await conn.query(stmt);
        upcomingReservations = results[0];

        const recentReservationsByDay = await Reservation.getRecentsByDay(conn);

        conn.release()

        res.send({
            success: true,
            upcomingReservations,
            overdueItems,
            activeRentees, 
            rentedItems, 
            peakReservationHours, 
            frequentlyReservedItems,
            recentReservationsByDay
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;