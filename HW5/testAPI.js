"use strict";
// this portion is used for the query call to Google Translation API
const APIrequest = require('request');
const http = require('http');

const APIkey = "AIzaSyCyuMrm3X_4p7wRhJ0gr005SfK7Hr2FIM8";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey

// used for the query request of my server
const express = require('express');
const port = 59168;

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

function fileNotFound(req, res)
{
	let url = req.url;
	res.type('text/plain');
	res.status(404);
	res.send('Cannot find '+url);
}

const app = express();
app.use(express.static('public')); // check if there is a static file
app.get('/query', queryHandler); // check if query is valid
app.use(fileNotFound);

app.listen(port, function(){console.log('Listening...');});
