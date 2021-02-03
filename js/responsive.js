const chevBar = document.querySelector('.chev-bar');

function handleChevIcon() {
	const icon = chevBar.querySelector('i');
	if (icon.classList.contains('fa-chevron-down')) {
		icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
		toDoList.style.display = 'none';
	} else {
		icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
		toDoList.style.display = 'block';
	}
}
