// CURRENT ROUTE: /api/reservations~
const router = require('express').Router();
const Reservation = require('../model/Reservation.model');

/*
SELECT COUNT(*) AS count, DATE_FORMAT(reservation_date, '%Y-%m-%d') AS date FROM reservation WHERE CURDATE() > reservation_date GROUP BY date ORDER BY date DESC;
*/
router.get('/', async (req, res, next) => {
    try {
        const reservations = await Reservation.getRecentsByDay();

        res.send({ success: true, reservations });
    } catch (error) {
        next(error);
    }
})

module.exports = router;