var express = require('express');
 
//MongoDB Includes
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var connectionString = process.env.CUSTOMCONNSTR_MongoDB || 'mongodb://40.84.55.22/survey';

var app = express()

//Point Session Objects to the MongoDB instance
/*var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
app.use(expressSession({
      secret: 'F91Mvoi#!nflacn@',
      store: new MongoStore({
      host: settings.session_host,
      port: settings.session_port,
      url: 'mongodb://' + settings.session_username + ':' + settings.session_password + '@' + settings.session_host + ':' + settings.session_port + '/' + settings.session_database}),
      resave: false,
      saveUninitialized: false,
      rolling: true,
      maxAge: 60 * 1000 * 60
  }));
  
  //app.use(passport.initialize());
  //app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session
*/
var router = express.Router();
var index = require('./routes/index');
//var postmessage = require('./routes/postmessage');


//Define View location and view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Make public direction for storing common images,etc
app.use(express.static('public'));

//Bodyparser - helps reading HTTP POST data
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//require('./app/routes.js')(app,passport);

app.use('/', index);

app.listen(3000);
console.log("Listening on port 3000");


module.exports = app;