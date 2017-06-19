var router = require('express').Router();
var controller = require('../controllers/userController');

router.get('/users', controller.getUsers);
router.post('/users/save', controller.saveUser);
router.get('/users/seed', controller.seedUsers);

module.exports = router;