'use strict';
const input = (<div className="navContent">
			<div className="topNav">
				<button
				className="add"
				onClick={function() {
					window.location.assign('/user/lango.html');
				}}>Add</button>

				<p className="title">Lango!</p>
			</div>
		</div>
);

function FlashCards() {
	return (<div className="flashcards">
			<div id="flipCard">
				<img id="flipButton" onClick={flip} src="assets/noun_Refresh_2310283.svg" alt="missing img button"/>
				<input id="frontCard" readOnly></input>
				<input id="backCard" readOnly></input>
				<input id="correctCard" value="Correct!" readOnly></input>
			</div>
			<input placeholder="Answer Here" id="outputCard" onKeyPress={flipIfEnter}></input>
		</div>
	);
}

function Username() {
	return (<div className="userContainer">
			<p id="username"></p>
		</div>
);
}

function NextButton() {
	return (<div className="next">
		<button id="nextButton" onClick={next}>Next</button>
		</div>
);
}

const htmlCode = (<main className="container">
			{input}
			<FlashCards/>
			<NextButton/>
			<Username/>
		</main>
);

ReactDOM.render(
	htmlCode,
	document.getElementById('root')
);

function flipIfEnter() {
	if (event.charCode == 13) {
		flip();
	}
}

function flip() {
	let card = document.getElementById("flipCard");
	let flipButton = document.getElementById("flipButton");
	let outputCard = document.getElementById("outputCard");
	let backCard = document.getElementById("backCard");
	let correctCard = document.getElementById("correctCard");
	card.classList.add("disappear");
	flipButton.classList.add("disappear");
	card.classList.add("rotate");
	card.id = "correct";
	if (outputCard.value !== backCard.value) {
		correctCard.classList.add("disappear");
	}
}

function resetFlip() {
	let card = document.getElementById("correct");
	let flipbutton = document.getElementById("flipbutton");
	let outputCard = document.getElementById("outputCard");
	let correctCard = document.getElementById("correctCard");
	card.classList.remove("disappear");
	flipButton.classList.remove("disappear");
	card.classList.remove("rotate");
	card.id = "flipCard";
	correctCard.classList.remove("disappear");
}

function createCORSRequest(method, url) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);  // call its open method
	return xhr;
}

function getUsernameCorsRequest() {
	let username = document.getElementById("username");
	let url = "username";

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
		let usernameString = jsonObj.firstName+" "+jsonObj.lastName;
		username.textContent = usernameString;
	};

	xhr.onerror = function() {
	alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();
}

function getReviewCard() {	
	let frontCard = document.getElementById("frontCard");
	let backCard = document.getElementById("backCard");
	let url = "flashcard";

	let xhr = createCORSRequest('GET', url);

	if (!xhr) {
		alert('CORS not supported');
		return;
	}

	xhr.onload = function () {
		let responseStr = xhr.responseText;
		let jsonObj = JSON.parse(responseStr);
		frontCard.value = jsonObj.spanish;
		backCard.value = jsonObj.english;
		console.log("spanish and english"+jsonObj.spanish+jsonObj.english);
	};
	
	xhr.onerror = function () {
		alert('Woops, there was an error making the request.');
	};
	
	xhr.send();
}

function next() {
	let outputCard = document.getElementById("outputCard");
	outputCard.value = "";
	resetFlip();
	getReviewCard();
}

getUsernameCorsRequest();
getReviewCard();
