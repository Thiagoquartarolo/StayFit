var def = require('./defaultRoutes');
var login = require('./loginRoutes');
var user = require('./userRoutes');

module.exports = function(app){
	app.use('/', def);
	app.use('/', login);
	app.use('/', user);
};