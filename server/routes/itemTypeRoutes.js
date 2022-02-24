const router = require('express').Router();
const ItemType = require('../model/ItemType.model');

router.get('/', async (req, res, next) => {
    try {
        const itemTypes = await ItemType.getAll();

        res.send({ success: true, itemTypes });
    } catch (error) {
        next(error);
    }
});

module.exports = router;