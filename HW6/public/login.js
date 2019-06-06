"use strict";

function Gradient() {
	return React.createElement(
		"div",
		{ className: "gradient" },
		React.createElement(
			"p",
			{ className: "welcomeTitle" },
			"Welcome to"
		),
		React.createElement(
			"p",
			{ className: "LangoTitle" },
			"Lango!"
		),
		React.createElement(
			"p",
			{ className: "customizeTitle" },
			"Customize your vocabulary"
		)
	);
}

function Login() {
	return React.createElement(
		"div",
		{ className: "login" },
		React.createElement(
			"button",
			{ id: "loginButton",
				onClick: function onClick() {
					window.location.assign('/auth/google');
				} },
			React.createElement("img", { className: "googleImg", src: "/assets/google.jpg" }),
			React.createElement(
				"span",
				{ className: "loginText" },
				"Login with Google"
			)
		)
	);
}

var htmlCode = React.createElement(
	"main",
	null,
	React.createElement(Gradient, null),
	React.createElement(Login, null)
);

ReactDOM.render(htmlCode, document.getElementById("root"));

