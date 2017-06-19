var router = require('express').Router();
var controller = require('../controllers/loginController');

router.get('/login', controller.getLogin);

module.exports = router;