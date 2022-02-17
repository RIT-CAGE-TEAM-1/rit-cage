// CURRENT ROUTE: /api/items~
const router = require('express').Router();
const ItemModel = require('../model/ItemModel.model');

// get all item models
router.get('/', async (req, res, next) => {
    try {
        const searchQuery = req.query.search;
        let itemModels = null;

        if (searchQuery) {
            itemModels = await ItemModel.getByName(searchQuery);
        } else {
            itemModels = await ItemModel.getAll();
        }

        res.send({ success:true, itemModels });
    } catch (error) { next(error); }
});

// get an item model by id
router.get('/:id', async (req, res, next) => {
    try {
        const item = await ItemModel.get(req.params.id);

        res.send({ success: true, item });
    } catch (error) { next(error); }
});

// --

// create an item
router.post('/', async (req, res, next) => {
    try {
        await ItemModel.create(req.body)

        res.send({ success:true });
    } catch (error) { next(error); }
});

// update an item
router.get('/:id', async (req, res, next) => {
    try {
        await ItemModel.update(req.params.id, req.body);

        res.send({ success: true });
    } catch (error) { next(error); }
});

// delete an item
router.delete('/:id', async (req, res, next) => {
    try {
        await ItemModel.delete(req.params.id);

        res.send({ success: true });
    } catch (error) { next(error); }
});

module.exports = router;