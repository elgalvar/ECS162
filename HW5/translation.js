"use strict";

function createCORSRequest(method, url) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);  // call its open method
	return xhr;
}

function translationCorsRequest() {
	let phrase = document.getElementById("phrase");
	phrase = phrase.value;
	let url = "query?phrase="+phrase;

	let xhr = createCORSRequest('GET', url);

	// checking if browser does CORS
	if (!xhr) {
	alert('CORS not supported');
	return;
	}

	// Load some functions into response handlers.
	xhr.onload = function() {
		let responseStr = xhr.responseText;  // get the JSON string 
		let jsonObj = JSON.parse(responseStr);  // turn it into an object
		let translation = jsonObj.Spanish;
		let outputGoesHere = document.getElementById("outputGoesHere");
		outputGoesHere.textContent = translation;
	};

	xhr.onerror = function() {
	alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();
}

function storeCorsRequest() {
	let phrase = document.getElementById("phrase");
	let output = document.getElementById("outputGoesHere");
	output = output.textContent;
	phrase = phrase.value;
	let url = "store?english=" + phrase + "&spanish=" + output;

	let xhr = createCORSRequest('GET', url);

	// checking if browser does CORS
	if (!xhr) {
	alert('CORS not supported');
	return;
	}

	// Load some functions into response handlers.
	xhr.onload = function() {
		console.log("saved.");
	};

	xhr.onerror = function() {
	alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();
}

function searchBar() {
	let searchBar = document.getElementById("phrase");
	searchBar.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("submitButton").click();
		}
	});
}

searchBar();
