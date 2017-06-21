const router = require('express').Router();
const controller = require('../controllers/loginController');

router.get('/', controller.getValues);
router.post('/home', controller.validateLogin);
router.get('/logout', controller.logout);

module.exports = router;