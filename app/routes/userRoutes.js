const router = require('express').Router();
const controller = require('../controllers/userController');

router.get('/users', controller.getUsers);
router.post('/users/save', controller.saveUser);

module.exports = router;