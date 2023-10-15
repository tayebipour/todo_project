const save_btn = document.querySelector(".btn-success");
const title_input = document.querySelector("#title");
const list = document.querySelector(".list");

let todo_list = [];

function renderItem(todo_item) {
  // div class item
  const item = document.createElement("div");
  item.classList.add("item", "form-check", "form-switch");

  // Input checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("form-check-input");
  checkbox.checked=todo_item.status;

  // span for text
  const span = document.createElement("span");
  span.textContent = todo_item.title;

  item.appendChild(checkbox);
  item.appendChild(span);
  list.appendChild(item);
}

function clearInput() {
  title_input.value = "";
  save_btn.classList.remove("btn-dark");
  save_btn.classList.add("btn-success");
}

function renderList() {
  for (let i = 0; i < todo_list.length; i++) {
    const item = todo_list[i];
    renderItem(item);
  }
}

function syncStorag(item) {
  const next_item = {
    title: item.title,
    status: item.status,
  };
  todo_list.push(next_item);
  localStorage.setItem("my_list", JSON.stringify(todo_list));
}

function loadFromStorage() {
  const listFromStorage = JSON.parse(localStorage.getItem("my_list")) || [];
  todo_list = listFromStorage;
}

function onAddItem() {
  const val = title_input.value;

  if (val === "") {
    alert("write your todo...");
  } else {
    const item={
      title: val,
      status: false,
    }
    syncStorag(item);
    renderItem(item);
    clearInput();
  }
}

function events() {
  save_btn.addEventListener("click", onAddItem);
}

function checkInput() {
  title_input.addEventListener("keydown", () => {
    save_btn.classList.remove("btn-success");
    save_btn.classList.add("btn-dark");
    if (title_input.value === "") {
      save_btn.classList.remove("btn-dark");
      save_btn.classList.add("btn-success");
    }
  });
}

function init() {
  checkInput();
  loadFromStorage();
  renderList();
  events();
}

init();
