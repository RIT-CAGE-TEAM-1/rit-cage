// CURRENT ROUTE: /api/items~
const router = require('express').Router();
const ItemModel = require('../model/ItemModel.model');

// get all inventory item models
router.get('/', async (req, res, next) => {
    try {
        const searchQuery = req.query;
        console.log('SEARCH ' + JSON.stringify(searchQuery));
        let itemModels = null;

        if (searchQuery) {
            itemModels = await ItemModel.getByName(searchQuery);
        } else {
            itemModels = await ItemModel.getAll();
        }

        res.send({ success:true, itemModels });
    } catch (error) { next(error); }
});

// get an inventory item by id
router.get('/:id', async (req, res, next) => {
    try {
        const item = await Item.get(req.params.id);

        res.send({ success: true, item });
    } catch (error) { next(error); }
});

module.exports = router;