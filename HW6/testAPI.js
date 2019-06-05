"use strict";
// this portion is used for the query call to Google Translation API
const APIrequest = require('request');
const http = require('http');
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');

const APIkey = "AIzaSyCyuMrm3X_4p7wRhJ0gr005SfK7Hr2FIM8";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey

// used for the query request of my server
const express = require('express');
const port = 59168;

// used for database
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.


const googleLoginData = {
	clientID: '619212366204-dfhq3ifleuk514123kudv8tr39ggao5r.apps.googleusercontent.com',
	clientSecret: 'QX8ay2Zeqq6HMgKhtAV5kJC7',
	callbackURL: '/auth/redirect'
};

// Tell passport we will login with google
passport.use( new GoogleStrategy(googleLoginData, gotProfile) );


function runAPIrequest(res, requestObject)
{
	// The call that makes a request to the API
	// Uses the Node request module, which packs up and sends off
	// an HTTP message containing the request to the API server
	function APIcallback(err, APIresHead, APIresBody)
	{
		// gets three objects as input
		if ((err) || (APIresHead.statusCode != 200)) {
			// API is not working
			console.log("Got API error");
			console.log(APIresBody);
		} else {
			if (APIresHead.error) {
			// API worked but is not giving you data
			console.log(APIresHead.error);
			} else {
			console.log("In Spanish: ", 
			    APIresBody.data.translations[0].translatedText);
			console.log("\n\nJSON was:");
			console.log(JSON.stringify(APIresBody, undefined, 2));
			// print it out as a string, nicely formatted
			res.json( {"English": requestObject.q[0], "Spanish": 
				APIresBody.data.translations[0].translatedText});
			}
		}
	} // end callback function

	APIrequest(
		{ // HTTP header stuff
			url: url,
			method: "POST",
			headers: {"content-type": "application/json"},
			// will turn the given object into JSON
			json: requestObject	},
		// callback function for API request
		APIcallback
		); 
}

function queryHandler(req, res, next)
{
	let qObj = req.query;
	//console.log(qObj);
	if (qObj.phrase != undefined) {
		let phrase = qObj.phrase;
		// An object containing the data expressing the query to the
		// translate API. 
		// Below, gets stringified and put into the body of an HTTP PUT request.
		let requestObject = 
			{
			"source": "en",
			"target": "es",
			"q": [

			]
			}
		requestObject.q[0] = phrase;
		runAPIrequest(res, requestObject);
	} else {
		next();
	}
}

function storeToDatabase(qObj, user) {
	//const dbFileName = "Flashcards.db";
	// makes the object that represents the database in our code
	//const db = new sqlite3.Database(dbFileName);  // object, not database.
	
	const cmdStr = 'INSERT INTO Flashcards (userId, english, spanish, seen, correct)  VALUES (@userId,@english,@spanish,0,0)';
	db.run(cmdStr, user.userId, qObj.english, qObj.spanish, tableCreationCallback);
}

function tableCreationCallback(err) {
	if (err) {
		console.log("Table insert error",err);
	} else {
		console.log("Data added");
		//db.close();
	}
}

function storeFlashcard(req, res, next) {
	let qObj = req.query;

	if (qObj.english != undefined && qObj.spanish != undefined) {
		storeToDatabase(qObj,req.user);
		res.json({"English": qObj.english, "Spanish": qObj.spanish});
	} else {
		next();
	}
}

// function to check whether user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
	if (req.user) {
		console.log("Req.session:",req.session);
		console.log("Req.user:",req.user);
		next();
	} else {
		res.redirect('/login.html');  // send response telling
		// Browser to go to login page
	}
}


function fileNotFound(req, res)
{
	let url = req.url;
	res.type('text/plain');
	res.status(404);
	res.send('Cannot find '+url);
}

function startReview(req, res, next) {
	res.redirect('/review.html');
}

function getUsername(req, res, next) {
	let userData = req.user;
	res.json(userData);
}

const app = express();

// pipeline stage that just echos url, for debugging
app.use('/', printURL);

// Check validity of cookies at the beginning of pipeline
// Will get cookies out of request, decrypt and check if 
// session is still going on. 
app.use(cookieSession({
	maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
	// meaningless random string used by encryption
	keys: ['hanger waldo mercy dance']
}));

// Initializes request object for further handling by passport
app.use(passport.initialize());
// If there is a valid cookie, will call deserializeUser()
app.use(passport.session());
// start login process
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }) );

// Google redirects here after user successfully logs in
// This route has three handler functions, one run after the other. 
app.get('/auth/redirect',
	// for educational purposes
	function (req, res, next) {
		console.log("at auth/redirect");
		next();
	},
	// This will issue Server's own HTTPS request to Google
	// to access the user's profile information with the 
	// temporary key we got in the request. 
	passport.authenticate('google'),
	// then it will run the "gotProfile" callback function,
	// set up the cookie, call serialize, whose "done" 
	// will come back here to send back the response
	// ...with a cookie in it for the Browser! 
	function (req, res) {
		console.log('Logged in and using cookies!');
		const cmdStr = 'SELECT userId FROM Flashcards WHERE userId = ?';

		db.get(cmdStr,req.user, function(err,row) {
			if (err) {
				console.error(err.message);
			}
			if (row === undefined) {
				console.log("LANGO: " + req.user);
				res.redirect('/user/lango.html');
			} else {
				console.log("REVIEW: " + row);
				res.redirect('/user/review.html');
			}
		});
	});

// static files in /user are only available after login
app.get('/user/*',
	isAuthenticated, // only pass on to following function if
	// user is logged in 
	// serving files that start with /user from here gets them from ./
	express.static('.')
	);

app.use(express.static('public')); // check if there is a static file
app.get('/user/query', queryHandler); // check if query is valid
app.get('/user/store', storeFlashcard);
app.get('/user/username', getUsername);
app.use(fileNotFound);

app.listen(port, function(){console.log('Listening...');});

// print the url of incoming HTTP request
function printURL (req, res, next) {
	console.log(req.url);
	next();
}


// Some functions Passport calls, that we can use to specialize.
// This is where we get to write our own code, not just boilerplate. 
// The callback "done" at the end of each one resumes Passport's
// internal process. 

// function called during login, the second time passport.authenticate
// is called (in /auth/redirect/),
// once we actually have the profile data from Google. 
function gotProfile(accessToken, refreshToken, profile, done) {
	console.log("Google profile",profile);
	// here is a good place to check if user is in DB,
	// and to store him in DB if not already there. 
	// Second arg to "done" will be passed into serializeUser,
	// should be key to get user out of database.
	let dbRowId = profile.id;
	const cmdStr1 = 'SELECT userId FROM Userprofile WHERE userId = ?';

	db.get(cmdStr1,dbRowId, function(err,row) {
		//console.log("ROW: "+row);
		if (err) {
			console.error(err.message);
		}
		if (row === undefined) {
			console.log("ITS UNDEFINED");
			const cmdStr2 = 'INSERT INTO Userprofile (firstName, lastName, userId)  VALUES (@firstName,@lastName,@userId)';
			db.run(cmdStr2, profile.name.givenName, profile.name.familyName, dbRowId, tableCreationCallback);
		}
	});

	dbRowId = profile.id;  // temporary! Should be the real unique
	// key for db Row for this user in DB table.
	// Note: cannot be zero, has to be something that evaluates to
	// True.  

	done(null, dbRowId);
}

// Part of Server's sesssion set-up.  
// The second operand of "done" becomes the input to deserializeUser
// on every subsequent HTTP request with this session's cookie. 
passport.serializeUser((dbRowID, done) => {
	console.log("SerializeUser. Input is",dbRowID);
	done(null, dbRowID);
});

// Called by passport.session pipeline stage on every HTTP request with
// a current session cookie. 
// Where we should lookup user database info. 
// Whatever we pass in the "done" callback becomes req.user
// and can be used by subsequent middleware.
passport.deserializeUser((dbRowId, done) => {
	console.log("deserializeUser. Input is:", dbRowId);
	// here is a good place to look up user data in database using
	// dbRowID. Put whatever you want into an object. It ends up
	// as the property "user" of the "req" object.

	const cmdStr = 'SELECT firstName, lastName FROM Userprofile WHERE userId = ?';
	let userData;

	db.get(cmdStr,dbRowId, function(err,row) {
		//console.log("ROW: "+row);
		if (err) {
			console.error(err.message);
		}
		if (row === undefined) {
			userData = {"userId": dbRowId};
		} else {
			userData = {"firstName":row.firstName, "lastName": row.lastName, "userId": dbRowId};
		}
		done(null, userData);
	});
});

