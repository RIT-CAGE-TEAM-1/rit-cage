// CURRENT ROUTE: /api/reservations~
const router = require('express').Router();
const pool = require('../model/db');
const Reservation = require('../model/Reservation.model');
const ReservationItem = require('../model/ReservationItem.model');
const User = require('../model/User.model');
const Transaction = require('../model/transaction.model');
const Item = require('../model/Item.model');

router.post('/', async (req, res, next) => {
    try {
        const conn = await pool.getConnection();
        const transaction = new Transaction(conn);
        const { username, itemId } = req.body;

        try {
            await transaction.start();

            const userId = await User.getIdByUsername(username, conn);

            const reservation = {};
            reservation.due_date = new Date(new Date().setHours(new Date().getHours() + 1)).toISOString().slice(0, 19).replace('T', ' ');
            reservation.reservation_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            reservation.checkout_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            reservation.user_id = userId;
            reservation.status = "out";

            const reservationId = await Reservation.create(reservation, conn);
            await ReservationItem.create(reservationId, itemId, conn)
            await Item.update(itemId, { available: 0 });

            await transaction.commit();
            res.send({ success: true });
        } catch (error) {
            try {
                await transaction.rollback();
            } catch (error) {
                console.log('ERROR: UNABLE TO ROLLBACK TRANSACTION: ' + error)
            }

            next(error); 
        }
    } catch(error) {
        next(error);
    }
});

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