"strict mode";

function displayContent() {
	let gradient = document.getElementById("gradient");
	let weatherBlocks = document.getElementById("weatherBlocks");

	if (gradient.classList.contains("appear") == true) {
		gradient.classList.remove("appear");
		gradient.classList.add("disappear");
		weatherBlocks.classList.remove("disappear");
		weatherBlocks.classList.add("appear");
	} else {
		weatherBlocks.classList.remove("appear");
		weatherBlocks.classList.add("disappear");
		gradient.classList.remove("disappear");
		gradient.classList.add("appear");
	}
}

// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);  // call its open method
	return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {

	let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=a011967a42521d5c3b34be7122ac042b"

	let xhr = createCORSRequest('GET', url);

	// checking if browser does CORS
	if (!xhr) {
	alert('CORS not supported');
	return;
	}

	// Load some functions into response handlers.
	xhr.onload = function() {
		let responseStr = xhr.responseText;  // get the JSON string 
		jsonObj = JSON.parse(responseStr);  // turn it into an object
		//console.log(JSON.stringify(jsonObj, undefined, 2));  // print it out as a string, nicely formatted
		changeTime();
		changeTemp();
		changeImg();
	};

	xhr.onerror = function() {
	alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();
}

function changeTemp(){
	//let currentImg = document.getElementById("currentImg");
	//let currentTime = document.getElementById("currentTime");
	let weatherTemp = [];

	weatherTemp.push(document.getElementById("currentTemp"));
	weatherTemp.push(document.getElementById("weatherBlock1"));
	weatherTemp.push(document.getElementById("weatherBlock2"));
	weatherTemp.push(document.getElementById("weatherBlock3"));
	weatherTemp.push(document.getElementById("weatherBlock4"));
	weatherTemp.push(document.getElementById("weatherBlock5"));

	let i;
	for(i = 0; i < 6; i++) {
		weatherTemp[i].textContent = Math.round(jsonObj.list[i].main.temp);
	}
}

function changeImg() {
	let weatherImgs = [];
	weatherImgs.push(document.getElementById("currentImg"));
	weatherImgs.push(document.getElementById("weatherImg1"));
	weatherImgs.push(document.getElementById("weatherImg2"));
	weatherImgs.push(document.getElementById("weatherImg3"));
	weatherImgs.push(document.getElementById("weatherImg4"));
	weatherImgs.push(document.getElementById("weatherImg5"));
	
	let i;
	for(i = 0; i < 6; i++) {
		if (jsonObj.list[i].weather[0].description == "clear sky") {
			weatherImgs[i].src="assets/clearsky.svg";
		} else if (jsonObj.list[i].weather[0].description == "few clouds") {
			weatherImgs[i].src="assets/fewclouds-night.svg";
		} else if (jsonObj.list[i].weather[0].description == "broken clouds") {
			weatherImgs[i].src="assets/brokencloud.svg";
		} else if (jsonObj.list[i].weather[0].description == "scattered clouds") {
			weatherImgs[i].src="assets/scatteredclouds.svg";
		} else if (jsonObj.list[i].weather[0].description == "light rain") {
			weatherImgs[i].src="assets/showerrain.svg";
		} else if (jsonObj.list[i].weather[0].description == "rain") {
			weatherImgs[i].src="assets/rain-night.svg";
		} else if (jsonObj.list[i].weather[0].description == "thunderstorm") {
			weatherImgs[i].src="assets/thunderstorms.svg";
		} else if (jsonObj.list[i].weather[0].description == "snow") {
			weatherImgs[i].src="assets/snow.svg";
		} else if (jsonObj.list[i].weather[0].description == "mist") {
			weatherImgs[i].src="assets/mist.svg";
		}
	}
}

function changeTime () {
	let timeList = [];
	timeList.push(document.getElementById("currentTime"));
	timeList.push(document.getElementById("time1"));
	timeList.push(document.getElementById("time2"));
	timeList.push(document.getElementById("time3"));
	timeList.push(document.getElementById("time4"));
	timeList.push(document.getElementById("time5"));
	let i;
	for (i = 0; i < 6; i++) {
		let time = jsonObj.list[i].dt_txt;
		//console.log(time);
		let finalTime;
		time = time.split(" ");
		time = time[1];
		time = time.split(":");
		time = time[0];
		time = time - 7;
		//console.log(time);
		if(time < 0) {
			time = time + 24;
		}
		if (time > 12) {
			finalTime = String(time-12) + "pm";
		} else if (time == 12) {
			finalTime = String(time) + "pm";
		} else {
			finalTime = String(time) + "am";
		}
		//console.log(timeList[i]);
		timeList[i].textContent = finalTime;
		//console.log(finalTime);
	}
}

// run this code to make request when this script file gets executed 
makeCorsRequest();