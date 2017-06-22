const def = require('./loginRoutes');
const user = require('./userRoutes');
const seed = require('./seedRoutes');
const tenant = require('../../domain/security/tenant');

module.exports = function (app) {
	//Public routes
	app.use('/', def);

	//Admin routes
	app.use(tenant.isAdmin);
	app.use('/', user);

	//Dev routes
	app.use(tenant.isDev);
	app.use('/', seed);
};