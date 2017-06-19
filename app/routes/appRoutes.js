var def = require('./defaultRoutes');
var user = require('./userRoutes');

module.exports = function(app){
	app.use('/', def);
	app.use('/', user);
};