"use strict";

function createCORSRequest(method, url) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);  // call its open method
	return xhr;
}

function makeCorsRequest() {
	let word = document.getElementById("word");
	word = word.value;
	let url = "query?word="+word;

	let xhr = createCORSRequest('GET', url);

	// checking if browser does CORS
	if (!xhr) {
	alert('CORS not supported');
	return;
	}

	// Load some functions into response handlers.
	xhr.onload = function() {
		let responseStr = xhr.responseText;  // get the JSON string 
		let jsonObj = JSON.parse(responseStr);  // turn it into an objec
		let palindrome = jsonObj.palindrome;
		let outputGoesHere = document.getElementById("outputGoesHere");
		outputGoesHere.textContent = palindrome;
	};

	xhr.onerror = function() {
	alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();
}

function searchBar() {
	let searchBar = document.getElementById("word");
	searchBar.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("submitButton").click();
		}
	});
}

searchBar();
