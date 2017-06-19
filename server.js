// load environment variables
require('dotenv').config();
require('./dbStart');

//Grab dependencies
var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var port = process.env.PORT || 3000;
  
//Tell express where to look for static assets
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

require('./app/routes/appRoutes')(app);
require('./middlewares')(app);
  
//Start the server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});