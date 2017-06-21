const router = require('express').Router();
const controller = require('../controllers/seedController');

router.get('/seed/users', controller.seedUsers);

module.exports = router;