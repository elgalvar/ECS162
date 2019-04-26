"use strict";

let imageArray = []  // global variable to hold stack of images for animation 
let count = 0;          // global var

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
		let jsonObj = JSON.parse(responseStr);  // turn it into an object
		//console.log(JSON.stringify(jsonObj, undefined, 2));  // print it out as a string, nicely formatted
		changeTime(jsonObj);
		changeTemp(jsonObj);
		changeImg(jsonObj);
		let i;
		for (i = 0; i < 6; i++) {
			let unixtimestamp = jsonObj.list[i].dt*1000;
			getTenImages(new Date(unixtimestamp));
		}
	};

	xhr.onerror = function() {
	alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();
}

function changeTemp(jsonObj){
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

function dayTime(jsonObj, i, weatherImgs) {
	if (jsonObj.list[i].weather[0].description == "clear sky") {
		weatherImgs[i].src="assets/clearsky.svg";
	} else if (jsonObj.list[i].weather[0].description == "few clouds") {
		weatherImgs[i].src="assets/fewclouds-day.svg";
	} else if (jsonObj.list[i].weather[0].description == "broken clouds") {
		weatherImgs[i].src="assets/brokencloud.svg";
	} else if (jsonObj.list[i].weather[0].description == "scattered clouds") {
		weatherImgs[i].src="assets/scatteredclouds.svg";
	} else if (jsonObj.list[i].weather[0].description == "light rain") {
		weatherImgs[i].src="assets/showerrain.svg";
	} else if (jsonObj.list[i].weather[0].description == "rain") {
		weatherImgs[i].src="assets/rain-day.svg";
	} else if (jsonObj.list[i].weather[0].description == "thunderstorm") {
		weatherImgs[i].src="assets/thunderstorms.svg";
	} else if (jsonObj.list[i].weather[0].description == "snow") {
		weatherImgs[i].src="assets/snow.svg";
	} else if (jsonObj.list[i].weather[0].description == "mist") {
		weatherImgs[i].src="assets/mist.svg";
	}
}

function nightTime(jsonObj, i, weatherImgs) {
	if (jsonObj.list[i].weather[0].description == "clear sky") {
		weatherImgs[i].src="assets/clear-night.svg";
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

function changeImg(jsonObj) {
	let weatherImgs = [];
	weatherImgs.push(document.getElementById("currentImg"));
	weatherImgs.push(document.getElementById("weatherImg1"));
	weatherImgs.push(document.getElementById("weatherImg2"));
	weatherImgs.push(document.getElementById("weatherImg3"));
	weatherImgs.push(document.getElementById("weatherImg4"));
	weatherImgs.push(document.getElementById("weatherImg5"));

	let timeList = [];
	timeList.push(document.getElementById("currentTime"));
	timeList.push(document.getElementById("time1"));
	timeList.push(document.getElementById("time2"));
	timeList.push(document.getElementById("time3"));
	timeList.push(document.getElementById("time4"));
	timeList.push(document.getElementById("time5"));
	
	let i;
	let time;
	let pmam;
	for(i = 0; i < 6; i++) {

		if (i == 0) {
			time = (timeList[i].textContent).split("PM");
			pmam = (timeList[i].textContent).replace(/\d+/g,'');
			time = time[0];
			if ((time >=6  && pmam === "PM") || (time < 6 && pmam === "AM")) {
				nightTime(jsonObj, i, weatherImgs);
			} else {
				dayTime(jsonObj, i, weatherImgs);
			}
		} else {
			time = (timeList[i].textContent);
			time = time.split(" ");
			pmam = time[1];
			time = time[0];
			time = time.split(":");
			time = time[0];
			if ((time >=6  && pmam === "pm") || (time < 6 && pmam === "am")) {
				nightTime(jsonObj, i, weatherImgs);
			} else {
				dayTime(jsonObj, i, weatherImgs);
			}
		}
	}
}

function changeTime (jsonObj) {
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
		let finalTime;
		time = time.split(" ");
		time = time[1];
		time = time.split(":");
		time = time[0];
		time = time - 7;
		if(time < 0) {
			time = time + 24;
		}

		if (i== 0 && time > 12) {
			finalTime = String(time-12) + "PM";
		} else if (i == 0 && time == 12) {
			finalTime = String(time) + "PM";
		} else if (i == 0) {
			finalTime = String(time) + "AM";
		} else if (time > 12) {
			finalTime = String(time-12) + ":00 pm";
		} else if (time == 12) {
			finalTime = String(time) + ":00 pm";
		} else {
			finalTime = String(time) + ":00 am";
		}
		timeList[i].textContent = finalTime;
	}
}

function addToArray(newImage) {
	if (count < 10) {
		newImage.id = "doppler_"+count;
		//console.log("newImage ID is "+newImage.id);
		newImage.style.display = "none";
		imageArray.push(newImage);
		count = count+1;
		if (count >= 10) {
			console.log("Got 10 doppler images");
			dopplerAnimation(imageArray);
		}
	}
}


function tryToGetImage(dateObj) {
	let dateStr = dateObj.getUTCFullYear();
	dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	dateStr += String(dateObj.getUTCDate()).padStart(2, '0');
	let timeStr = String(dateObj.getUTCHours()).padStart(2,'0');
	timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');
	let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
	let newImage = new Image();
	newImage.onload = function () {
		console.log("got image "+filename);
		addToArray(newImage);
	}
	newImage.onerror = function() {
		console.log("failed to load "+filename);
	}
	newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename;
}


function getTenImages(dateObj) {
	// if we try 150 images, and get one out of every 10, we should get enough
	for (let i = 0; i < 150; i++) {
		let newImage = tryToGetImage(dateObj);
		dateObj.setMinutes( dateObj.getMinutes()-1 ); // back in time one minute
	}

}

function dopplerAnimation(imageArray) {
	let count = 0;
	let timer = setInterval(function() {
		let radarImg = document.getElementById("radarImg");
		radarImg.display = "none";
		radarImg.src = imageArray[count].src;
		radarImg.display = "inline";
		if(count < 9) {
			count+=1;
		} else {
			count = 0;
		}
	}, 80);
}

// run this code to make request when this script file gets executed 
makeCorsRequest();
//dopplerAnimation();