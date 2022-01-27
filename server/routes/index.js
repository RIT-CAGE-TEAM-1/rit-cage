// CURRENT ROUTE: /api~
const router = require('express').Router();

router.use('/items', require('./itemRoutes'));

module.exports = router;