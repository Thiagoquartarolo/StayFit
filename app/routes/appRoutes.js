const def = require('./loginRoutes');
const user = require('./userRoutes');
const seed = require('./seedRoutes');
const tenant = require('../../domain/security/tenant');

module.exports = function (app) {
	//Public routes
	app.use('/', def);

	//Admin routes
	app.use(tenant());
	app.use('/', user);

	//Dev routes
	app.use(tenant());
	app.use('/', seed);
};