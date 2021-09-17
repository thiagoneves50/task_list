// UI vars
const listApp = document.querySelector("#list-app");
const list = document.querySelector(".list");
const form = document.querySelector(".form-control");
const inputItem = document.querySelector(".input-item");
const addBtn = document.querySelector(".add-btn");

// load all event listeners
loadEventListeners();

function loadEventListeners() {
	// DOM load event (for the local storage items to be called)
	document.addEventListener("DOMContentLoaded", getTasks);

	// add task event
	form.addEventListener("submit", addItem);
	// remove task event
	list.addEventListener("click", removeItem);
}

function addItem(e) {
	if (inputItem.value === "") {
		alert("Type something");
	} else {
		// create li
		let listItem = document.createElement("li");
		listItem.className = "list-item";
		listItem.appendChild(document.createTextNode(inputItem.value));

		// create link to remove task
		const link = document.createElement("a");
		link.className = "delete-item";
		link.innerHTML = '<i class="far fa-trash-alt"></i>';
		listItem.appendChild(link);

		// append li to ul
		list.appendChild(listItem);

		// store in local storage
		storeTaskInLocalStorage(inputItem.value);

		// clear input
		inputItem.value = "";
	}
	e.preventDefault();
}

function removeItem(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		e.target.parentElement.parentElement.remove();
	}

	// remove from localstorage
	remveTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// LOCALSTORAGE================================================
// store in localstorage
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}
	tasks.push(task);

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// get tasks from localstorage
function getTasks() {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	// loop through the items stored in localstorage
	tasks.forEach(function (task) {
		// create li
		let listItem = document.createElement("li");
		listItem.className = "list-item";
		listItem.appendChild(document.createTextNode(task));

		// create link to remove task
		const link = document.createElement("a");
		link.className = "delete-item";
		link.innerHTML = '<i class="far fa-trash-alt"></i>';
		listItem.appendChild(link);

		// append li to ul
		list.appendChild(listItem);
	});
}

function remveTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}

		localStorage.setItem("tasks", JSON.stringify(tasks));
	});
}
