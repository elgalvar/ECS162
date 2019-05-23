'use strict';

var input = React.createElement(
	"div",
	{ className: "navContent" },
	React.createElement(
		"div",
		{ className: "topNav" },
		React.createElement(
			"button",
			{ className: "review" },
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
		React.createElement(
			"p",
			{ className: "username" },
			"UserName"
		)
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

