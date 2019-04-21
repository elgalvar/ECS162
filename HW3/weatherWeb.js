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