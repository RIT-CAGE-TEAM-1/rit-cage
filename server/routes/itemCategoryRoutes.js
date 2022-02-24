const router = require('express').Router();
const ItemCategory = require('../model/ItemCategory.model');

router.get('/', async (req, res, next) => {
    try {
        const itemCategories = await ItemCategory.getAll();

        res.send({ success: true, itemCategories });
    } catch (error) {
        next(error);
    }
});

module.exports = router;