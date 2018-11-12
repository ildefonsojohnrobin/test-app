//Set up dependencies
const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

const app = express()

//setting up port and server for heroku
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

//Set up database connection
var mongoDB = 'mongodb://root:asdfg123@ds225543.mlab.com:25543/heroku-test-db'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//setting up EJS view
app.use(express.static('public'));
app.set('view engine', 'ejs')

//setting up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//use User schema located in models/User.js
var Users = require('./models/User');

//render landing page
app.get('/', function (req, res) {
  res.render('index');
})

//post function for new users
app.post('/', function (req, res, cb) {
	//checks if username and email is already in the db
	var app = res;
	Users.find({ username: req.body.user }, function(err, user) {
		if (err) throw err;
		if (user.length) {
			return res.send("Username already exists");
		}
		else{
			Users.find({ email: req.body.email }, function(err, user) {
		  		if (err) throw err;
				if (user.length) {
					return res.send("Email already exists");
				}
				else{
					//checks if all fields are filled
					if(!req.body.user.length || !req.body.pw.length || !req.body.email.length ){
						return res.send("All fields are required");
					}
					else{
						//creation of new User using data from form
						var newUser = new Users({
							username: req.body.user,
							password: req.body.pw,
							email: req.body.email
						});
						//saving new user in MongoDB
						newUser.save(function(err) {
							if (err) throw err;
							console.log("User saved successfully");
						});
						app.render('index');
					}
				}
			});
		}
		app.redirect(req.get('referer'));
	});
})

app.post('/login', function (req, res, cb) {
	//checks if username exists in db
	var app = res;
	if(!req.body.login.length || !req.body.loginpw.length){
		app.send("All fields are required");
	}
	else{
	  	Users.find({ username: req.body.login }, function(err, user) {
			if (err) throw err;
			//if username is not found
			if (!user.length){
				//return app.send("User does not exist");
				return res.status(404).send('Username does not exist in the database');
			}
			else{
				//if username is found, hashed password is decrypted and compared
			    bcrypt.compare(req.body.loginpw, user[0].password, function(err, res) {
					if(res){
						//if password is correct, redirects to another page
						console.log("Logged in");
						app.send('<h1>Welcome, ' + user[0].username + '</h1>');
					}
					else {
						return app.send("Password incorrect");
					} 
			    });
			}
		});		
	}
})

app.post('/reset', function (req, res){
	var app = res;
	if(!req.body.reset.length){
		app.send("Username is required");
	} else {
		Users.find({ username: req.body.reset }, function(err, user) { 
			if (err) throw err;
			if (!user.length){
				return res.status(404).send('Username does not exist in the database');
			}
			else{
				app.send('<h1>Welcome, ' + user[0].username + '</h1><br>' + 
				'Your new password is ' + user[0].password);
			}
		});
	}
})

app.listen(port, host, function () {
  console.log('App listening on port:'+port);
})
