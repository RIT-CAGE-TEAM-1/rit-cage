// CURRENT ROUTE: /api/kits~

const router = require('express').Router();
const pool = require('../model/db');
const Reservation = require('../model/Reservation.model');
const ReservationItem = require('../model/ReservationItem.model');
const User = require('../model/User.model');
const Transaction = require('../model/transaction.model');
const Item = require('../model/Item.model');
const Kit = require('../model/Kit.model.js');

router.post('/', async (req, res, next) => {
    try {
        let stmt = '';
        let results = null;
        const { username, itemModelIds, class_code, comments } = req.body;

        const conn = await pool.getConnection();
        const transaction = new Transaction(conn);

        try {
            await transaction.start();

            const userId = await User.getIdByUsername(username, conn);

            const availableItemIds = [];
            for (let i=0; i<itemModelIds.length; i++) {
                const availableItem = await Item.getOneAvailableByItemModelId(itemModelIds[i], conn);
                availableItemIds.push(availableItem.item_id);
            }

            const newKit = {
                creator_id: userId, 
                comments
            }
            const kit_id = await Kit.create(newKit, conn);

            await Kit.createKitRestriction({ kit_id, class_code }, conn);

            const reservation = {};
            reservation.due_date = new Date(new Date().setHours(new Date().getHours() + 1)).toISOString().slice(0, 19).replace('T', ' ');
            reservation.reservation_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            reservation.checkout_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            reservation.user_id = userId;
            reservation.status = "out";

            const reservation_id = await Reservation.create(reservation, conn);

            for (let i=0; i<availableItemIds.length; i++) {
                const kit_instance_id = await Kit.createKitInstance({ kit_id }, conn);

                const newReservationItem = {
                    reservation_id, 
                    item_id: availableItemIds[0],
                    kit_instance_id
                };
                await ReservationItem.create(newReservationItem, conn);

                await Item.update(availableItemIds[i], { available: 0 }, conn);

                const newKitInstanceItem = {
                    kit_instance_id, 
                    item_id: availableItemIds[i],
                };
                await Kit.createKitInstanceItem(newKitInstanceItem, conn);
            }

            await transaction.commit();

            res.send({ success:true, dueDate: reservation.due_date });
        } catch (error) {
            try {
                await transaction.rollback();
            } catch (error) {
                console.log('ERROR: UNABLE TO ROLLBACK TRANSACTION: ' + error)
            }

            next(error);
        } finally {
            conn.release();
        }
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const { username } = req.query;

        const userId = await User.getIdByUsername(username);

        const kits = await Kit.getAllOfUser(userId);

        res.send({ success: true, kits });
    } catch (error) {
        next(error);
    }
});

module.exports = router;