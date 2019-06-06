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
				className: "add",
				onClick: function onClick() {
					window.location.assign('/user/lango.html');
				} },
			"Add"
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
		React.createElement(
			"div",
			{ id: "flipCard" },
			React.createElement("img", { id: "flipButton", onClick: flip, src: "assets/noun_Refresh_2310283.svg", alt: "missing img button" }),
			React.createElement("input", { id: "frontCard", readOnly: true }),
			React.createElement("input", { id: "backCard", readOnly: true }),
			React.createElement("input", { id: "correctCard", value: "Correct!", readOnly: true })
		),
		React.createElement("input", { placeholder: "Answer Here", id: "outputCard", onKeyPress: flipIfEnter })
	);
}

function Username() {
	return React.createElement(
		"div",
		{ className: "userContainer" },
		React.createElement("p", { id: "username" })
	);
}

function NextButton() {
	return React.createElement(
		"div",
		{ className: "next" },
		React.createElement(
			"button",
			{ id: "nextButton", onClick: next },
			"Next"
		)
	);
}

var htmlCode = React.createElement(
	"main",
	{ className: "container" },
	input,
	React.createElement(FlashCards, null),
	React.createElement(NextButton, null),
	React.createElement(Username, null)
);

ReactDOM.render(htmlCode, document.getElementById('root'));

function flipIfEnter() {
	if (event.charCode == 13) {
		flip();
	}
}

function flip() {
	var card = document.getElementById("flipCard");
	var flipButton = document.getElementById("flipButton");
	var outputCard = document.getElementById("outputCard");
	var backCard = document.getElementById("backCard");
	var correctCard = document.getElementById("correctCard");
	card.classList.add("disappear");
	flipButton.classList.add("disappear");
	card.classList.add("rotate");
	card.id = "correct";
	if (outputCard.value !== backCard.value) {
		correctCard.classList.add("disappear");
	}
}

function resetFlip() {
	var card = document.getElementById("correct");
	var flipbutton = document.getElementById("flipbutton");
	var outputCard = document.getElementById("outputCard");
	var correctCard = document.getElementById("correctCard");
	card.classList.remove("disappear");
	flipButton.classList.remove("disappear");
	card.classList.remove("rotate");
	card.id = "flipCard";
	correctCard.classList.remove("disappear");
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

function getReviewCard() {
	var frontCard = document.getElementById("frontCard");
	var backCard = document.getElementById("backCard");
	var url = "flashcard";

	var xhr = createCORSRequest('GET', url);

	if (!xhr) {
		alert('CORS not supported');
		return;
	}

	xhr.onload = function () {
		var responseStr = xhr.responseText;
		var jsonObj = JSON.parse(responseStr);
		frontCard.value = jsonObj.spanish;
		backCard.value = jsonObj.english;
		console.log("spanish and english" + jsonObj.spanish + jsonObj.english);
	};

	xhr.onerror = function () {
		alert('Woops, there was an error making the request.');
	};

	xhr.send();
}

function next() {
	var outputCard = document.getElementById("outputCard");
	outputCard.value = "";
	resetFlip();
	getReviewCard();
}

getUsernameCorsRequest();
getReviewCard();

