var bodyParser       = require('body-parser');
var session          = require('express-session');
var cookieParser     = require('cookie-parser');
var flash            = require('connect-flash');
var expressValidator = require('express-validator');

module.exports = function(app){

    //Set sessions and cookie parser
    app.use(cookieParser());
    app.use(session({
        secret: process.env.SECRET, 
        cookie: { maxAge: 60000 },
        resave: false,    //Forces the session to be saved back to the store
        saveUninitialized: false  //Dont save unmodified
    }));
    app.use(flash());

    // use body parser to grab info from a form
    //app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());

};