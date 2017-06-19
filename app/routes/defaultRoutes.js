var router = require('express').Router();
var controller = require('../controllers/defaultController');

router.get('/', controller.getValues);
router.post('/home', controller.validateLogin);
router.get('/logout', controller.logout);

module.exports = router;