'use strict';
const input = (<div className="navContent">
			<div className="topNav">
				<button
				className="review"
				onClick={function() {
					window.location.assign('/user/review.html');
				}}>Start Review</button>
				<p className="title">Lango!</p>
			</div>
		</div>
);

function FlashCards() {
	return (<div className="flashcards">
			<input
placeholder="English" id="inputCard" className="textBox" onKeyPress={translate}></input>
			<input placeholder="Translation" id="outputCard" className="textBox"></input>
		</div>
	);
}

function Username() {
	return (<div className="userContainer">
			<p id="username"></p>
		</div>
);
}

function SaveButton() {
	return (<div className="save">
		<button id="saveButton" onClick={save}>Save</button>
		</div>
);
}

const htmlCode = (<main className="container">
			{input}
			<FlashCards/>
			<SaveButton/>
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
