"use strict";

function Gradient() {
	return (<div className="gradient">
			<p className="welcomeTitle">Welcome to</p>
			<p className="LangoTitle">Lango!</p>
			<p className="customizeTitle">Customize your vocabulary</p>
		</div>	
	);
}

function Login() {
	return(<div className="login">
			<a href="auth/google">Login with Google</a>
		</div>
	);
}

const htmlCode = (<main>
			<Gradient/>
			<Login/>
		</main>
);

ReactDOM.render(
	htmlCode,
	document.getElementById("root")
);
