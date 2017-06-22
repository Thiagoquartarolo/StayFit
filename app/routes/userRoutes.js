const router = require('express').Router();
const controller = require('../controllers/userController');

router.get('/users', controller.getUsers);
router.get('/users/create', controller.createUser);
router.get('/users/edit/:id', controller.getUserById);
router.get('/users/delete/:id', controller.deleteUser);

router.post('/users/save', controller.saveUser);
router.post('/users/update/:id', controller.updateUser);

module.exports = router;