function readButton() {
	let readMoreButton = document.getElementById("readMoreButton");
	let readLessButton = document.getElementById("readLessButton");
	let middleContent = document.getElementById("middleContent");
	let footerContent = document.getElementById("footerContent");

	console.log("CHECK");
	if (middleContent.classList.contains("readLess") == true) {
		middleContent.classList.remove("readLess");
		readMoreButton.classList.remove("readMore");
		readLessButton.classList.remove("readLess");
		footerContent.classList.remove("readLess");

		middleContent.classList.add("readMore");
		readMoreButton.classList.add("readLess");
		readLessButton.classList.add("readMore");
		footerContent.classList.add("readMore");
		console.log(footerContent.classList);
	} else {
		middleContent.classList.remove("readMore");
		readMoreButton.classList.remove("readLess");
		readLessButton.classList.remove("readMore");
		footerContent.classList.remove("readMore");

		middleContent.classList.add("readLess");
		readMoreButton.classList.add("readMore");
		readLessButton.classList.add("readLess");
		footerContent.classList.add("readLess");
	}
}
