// UI vars
const listApp = document.querySelector("#list-app");
const list = document.querySelector(".list");
const form = document.querySelector(".form-control");
const inputItem = document.querySelector(".input-item");
const addBtn = document.querySelector(".add-btn");

// load all event listeners
loadEventListeners();

function loadEventListeners() {
	form.addEventListener("submit", addItem);
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
		inputItem.value = "";
	}
	e.preventDefault();
}

function removeItem(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		e.target.parentElement.parentElement.remove();
	}
}
