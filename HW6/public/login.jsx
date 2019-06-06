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
			<button id="loginButton"
			onClick={function() {
				window.location.assign('/auth/google');
			}}>
			<img className="googleImg" src="/assets/google.jpg"/>
			<span className="loginText">Login with Google</span>
			</button>
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
