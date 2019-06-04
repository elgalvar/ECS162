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
			React.createElement("img", { id: "flipButton", src: "assets/noun_Refresh_2310283.svg", alt: "missing img button" }),
			React.createElement("input", { id: "inputCard", onKeyPress: translate })
		),
		React.createElement("input", { placeholder: "Answer Here", id: "outputCard" })
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

function NextButton() {
	return React.createElement(
		"div",
		{ className: "next" },
		React.createElement(
			"button",
			{ id: "nextButton", onClick: save },
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

