// CURRENT ROUTE: /api/items~
const router = require('express').Router();
const Item = require('../model/Item.model');

// create an item
router.post('/', async (req, res, next) => {
    try {
        await Item.create(req.body)

        res.send({ success:true });
    } catch (error) { next(error); }
});

// get all inventory items
router.get('/', async (req, res, next) => {
    try {
        const searchQuery = req.query.search;
        let items = null;

        if (searchQuery) {
            items = await Item.getByName(searchQuery);
        } else {
            items = await Item.getAll();
        }

        res.send({ success:true, items });
    } catch (error) { next(error); }
});

// get an inventory item by id
router.get('/:id', async (req, res, next) => {
    try {
        const item = await Item.get(req.params.id);

        res.send({ success: true, item });
    } catch (error) { next(error); }
});

// update an item
router.get('/:id', async (req, res, next) => {
    try {
        await Item.update(req.params.id, req.body);

        res.send({ success: true });
    } catch (error) { next(error); }
});

// delete an item
router.delete('/:id', async (req, res, next) => {
    try {
        await Item.delete(req.params.id);

        res.send({ success: true });
    } catch (error) { next(error); }
});

module.exports = router;