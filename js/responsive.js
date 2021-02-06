const chevBar = document.querySelector(".chev-bar");
let zidx = 0;
function handleChevIcon() {
	const icon = chevBar.querySelector("i");
	if (icon.classList.contains("fa-chevron-down")) {
		icon.classList.replace("fa-chevron-down", "fa-chevron-right");
		toDoList.style.display = "none";
	} else {
		icon.classList.replace("fa-chevron-right", "fa-chevron-down");
		toDoList.style.display = "block";
	}
}

// target elements with the "draggable" class
interact(".draggable").draggable({
	// enable inertial throwing
	inertia: true,
	// keep the element within the area of it's parent
	modifiers: [
		interact.modifiers.restrictRect({
			restriction: "parent",
			endOnly: true,
		}),
	],
	// enable autoScroll
	autoScroll: true,

	listeners: {
		// call this function on every dragmove event
		move: dragMoveListener,

		// call this function on every dragend event
	},
});

function dragMoveListener(event) {
	var target = event.target;
	// keep the dragged position in the data-x/data-y attributes
	zidx += 1;
	target.style.zIndex = zidx;
	var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
	var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

	// translate the element
	target.style.webkitTransform = target.style.transform = "translate(" + x + "px, " + y + "px)";

	// update the posiion attributes
	target.setAttribute("data-x", x);
	target.setAttribute("data-y", y);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

function getfocus() {
	document.querySelector(".input").focus();
}
