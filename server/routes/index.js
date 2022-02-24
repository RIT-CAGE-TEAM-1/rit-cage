// CURRENT ROUTE: /api~
const router = require('express').Router();

router.use('/item-models', require('./itemModelRoutes'));
router.use('/items', require('./itemRoutes'));
router.use('/item-categories', require('./itemCategoryRoutes'));
router.use('/item-types', require('./itemTypeRoutes'))

router.get('/test', (req, res) => {
    res.send({ success:true, message: 'The cage api is working!' });
});

module.exports = router;