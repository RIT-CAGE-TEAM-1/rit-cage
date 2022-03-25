// CURRENT ROUTE: /api/users~

const router = require('express').Router();
const User = require('../model/User.model');

router.get('/', async (req, res, next) => {
    try {
        const itemCategories = await ItemCategory.getAll();

        res.send({ success: true, itemCategories });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.getByUsername(req.body.username);

        if (!user) {
            return res.status(401).send({ 
                success: false, 
                error: `Invalid login. User ${req.body.username} not found!` 
            });
        }

        res.send({ success: true, user });
    } catch (error) {
        next(error);
    }
});

module.exports = router;