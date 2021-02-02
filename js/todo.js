const toDoForm = document.querySelector('.js-toDoForm'),
	toDoInput = toDoForm.querySelector('input'),
	toDoList = document.querySelector('.js-toDoList'),
	prevCommand = document.querySelector('.prevcommand');

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event) {
	if (typeof event === 'string') {
		const spans = toDoList.querySelectorAll('li span');
		const spansArr = Array.from(spans);
		spansArr.every((li) => {
			if (li.innerHTML === event) {
				toDoList.removeChild(li.parentNode.parentNode);
				toDos = toDos.filter((toDo) => {
					return toDo.id !== parseInt(li.parentNode.parentNode.id);
				});
				saveToDos();
			}
		});
	} else {
		const button = event.target;
		const li = button.parentNode;
		toDoList.removeChild(li);
		toDos = toDos.filter((toDo) => {
			return toDo.id !== parseInt(li.id);
		});
		saveToDos();
	}
}

function loadToDos() {
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if (loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos);
		parsedToDos.forEach((toDo) => {
			paintToDo(toDo.text);
		});
	}
}

//JS localstorage는 string 으로 저장
//Obj string처리 = JSON.stringify()
function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = toDoInput.value;
	const command = currentValue.split(' ', 1);
	let toDo = currentValue.replace(command, '');
	paintPrevCommand(currentValue);
	if (command[0] === 'touch') {
		console.log(toDo);
		paintToDo(toDo);
	} else if (command[0] === 'rm') {
		deleteToDo(toDo);
	} else if (command[0] === 'clear') {
		while (prevCommand.firstChild) {
			prevCommand.removeChild(prevCommand.firstChild);
		}
	} else if (currentValue === '') {
	} else {
		paintPrevCommand(`command not found: ${command[0]}`);
	}
	toDoInput.value = '';
}

function paintPrevCommand(currentValue) {
	const path = document.createElement('div');
	path.className = 'path';
	const box = document.createElement('div');
	box.className = 'path-box';
	const commander = document.createElement('span');
	commander.innerText = '~/toDo>';
	box.appendChild(commander);
	path.appendChild(box);
	const todospan = document.createElement('span');
	todospan.innerText = currentValue;
	path.appendChild(todospan);
	prevCommand.appendChild(path);
}

function findIcon(todo) {
	const icon = document.createElement('i');
	const extension = todo.split('.')[1];
	if (extension === 'html') {
		icon.classList.add('fab', 'fa-html5');
	} else if (extension === 'css') {
		icon.classList.add('fab', 'fa-css3');
	} else if (extension === 'js') {
		icon.classList.add('fab', 'fa-js');
	}
	return icon;
}

function paintToDo(todo) {
	const li = document.createElement('li');
	const box = document.createElement('div');
	const deleteButton = document.createElement('button');
	const span = document.createElement('span');
	const newId = Date.now();
	const icon = findIcon(todo);
	span.innerText = todo;
	deleteButton.innerText = '❌';
	deleteButton.addEventListener('click', deleteToDo);
	box.appendChild(icon);
	box.appendChild(span);
	li.appendChild(box);
	li.appendChild(deleteButton);
	li.id = newId;
	toDoList.appendChild(li);
	const toDoObj = {
		text: todo,
		id: newId,
	};
	toDos.push(toDoObj);
	saveToDos();
}

function getfocus() {
	document.querySelector('.input').focus();
}

function init() {
	loadToDos();

	toDoForm.addEventListener('submit', handleSubmit);
}

init();
