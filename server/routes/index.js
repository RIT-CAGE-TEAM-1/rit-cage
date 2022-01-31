// CURRENT ROUTE: /api~
const router = require('express').Router();

router.use('/items', require('./itemRoutes'));

router.get('/test', (req, res) => {
    res.send({ success:true, message: 'The cage api is working!' });
});

module.exports = router;