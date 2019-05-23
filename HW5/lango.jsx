'use strict';
const input = (<div className="navContent">
			<div className="topNav">
				<button className="review">Start Review</button>
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
			<p className="username">UserName</p>
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
