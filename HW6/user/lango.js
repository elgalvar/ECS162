'use strict';

var input = React.createElement(
	"div",
	{ className: "navContent" },
	React.createElement(
		"div",
		{ className: "topNav" },
		React.createElement(
			"button",
			{
				className: "review",
				onClick: function onClick() {
					window.location.assign('/user/review.html');
				} },
			"Start Review"
		),
		React.createElement(
			"p",
			{ className: "title" },
			"Lango!"
		)
	)
);

function FlashCards() {
	return React.createElement(
		"div",
		{ className: "flashcards" },
		React.createElement("input", {
			placeholder: "English", id: "inputCard", className: "textBox", onKeyPress: translate }),
		React.createElement("input", { placeholder: "Translation", id: "outputCard", className: "textBox" })
	);
}

function Username() {
	return React.createElement(
		"div",
		{ className: "userContainer" },
		React.createElement("p", { id: "username" })
	);
}

function SaveButton() {
	return React.createElement(
		"div",
		{ className: "save" },
		React.createElement(
			"button",
			{ id: "saveButton", onClick: save },
			"Save"
		)
	);
}

var htmlCode = React.createElement(
	"main",
	{ className: "container" },
	input,
	React.createElement(FlashCards, null),
	React.createElement(SaveButton, null),
	React.createElement(Username, null)
);

ReactDOM.render(htmlCode, document.getElementById('root'));

function translate() {
	if (event.charCode == 13) {
		translationCorsRequest();
	}
	console.log(event.charCode);
}

function save() {
	var input = document.getElementById("inputCard");
	var output = document.getElementById("outputCard");
	input = input.value;
	output = output.value;
	if (input != "" && output != "") {
		storeCorsRequest();
	} else {
		alert("Cannot save!");
	}
}

function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true); // call its open method
	return xhr;
}

function getUsernameCorsRequest() {
	var username = document.getElementById("username");
	var url = "username";

	var xhr = createCORSRequest('GET', url);

	// checking if browser does CORS
	if (!xhr) {
		alert('CORS not supported');
		return;
	}

	// Load some functions into response handlers.
	xhr.onload = function () {
		var responseStr = xhr.responseText; // get the JSON string 
		var jsonObj = JSON.parse(responseStr); // turn it into an object
		var usernameString = jsonObj.firstName + " " + jsonObj.lastName;
		username.textContent = usernameString;
	};

	xhr.onerror = function () {
		alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();
}
getUsernameCorsRequest();

