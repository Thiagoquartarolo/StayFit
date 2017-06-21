var def = require('./defaultRoutes');
var user = require('./userRoutes');
var tenant = require('../../domain/security/tenant');

module.exports = function (app) {
	//Public routes
	app.use('/', def);

	//Restrict routes
	app.use(tenant());
	app.use('/', user);
};