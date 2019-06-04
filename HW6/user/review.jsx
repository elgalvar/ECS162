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
			<p className="username">UserName</p>
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
