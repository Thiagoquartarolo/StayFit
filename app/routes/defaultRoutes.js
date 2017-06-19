var router = require('express').Router();
var controller = require('../controllers/defaultController');

router.get('/', controller.getValues);

module.exports = router;