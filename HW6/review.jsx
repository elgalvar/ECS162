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
				<img id="flipButton" src="assets/noun_Refresh_2310283.svg" alt="missing img button"/>
				<input id="inputCard" onKeyPress={translate}></input>
			</div>
			<input placeholder="Answer Here" id="outputCard"></input>
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
		<button id="nextButton" onClick={save}>Next</button>
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

function translate() {
	if(event.charCode == 13) {
		translationCorsRequest();
	}
	console.log(event.charCode);
}

function save() {
	let input = document.getElementById("inputCard");
	let output = document.getElementById("outputCard");
	input = input.value;
	output = output.value;
	if(input != "" && output != "") {
		storeCorsRequest();
	} else {
		alert("Cannot save!");
	}
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
getUsernameCorsRequest();
