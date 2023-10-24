const save_btn = document.querySelector(".btn-outline-success");
const del_btn = document.querySelector(".btn-outline-danger");
const title_input = document.querySelector("#title");
const list = document.querySelector(".list");
const select = document.getElementById("filter");

const search_input = document.querySelector(".form-control");
const search_btn = document.querySelector(".btn-outline-dark");

const todo_from = document.querySelector("#todo-from")



let todo_list = [];

// work with dom

function renderItem(todo_item) {
  // div class item
  const item = document.createElement("div");
  item.classList.add("item", "form-check", "form-switch");

  // Input checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("form-check-input");
  checkbox.checked = todo_item.status;

  // span for text
  const span = document.createElement("span");
  span.textContent = todo_item.title;

  item.appendChild(checkbox);
  item.appendChild(span);
  list.appendChild(item);

  checkbox.addEventListener("click", () => {
    toggleStatus(todo_item.title);
  });
}

function clearInput() {
  title_input.value = "";
  save_btn.classList.remove("btn-dark");
  save_btn.classList.add("btn-outline-success");
}

function renderList() {
  // remove old item
  list.innerHTML = "";
  // new item
  for (let i = 0; i < todo_list.length; i++) {
    const item = todo_list[i];
    renderItem(item);
  }
}

// work with storage

function syncStorag() {
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
    return;
  }
  const item = {
    title: val,
    status: false,
  };
  addItem(item);
  syncStorag();
  renderItem(item);
  clearInput();
}

// Functionality

function toggleStatus(title) {
  for (let i = 0; i < todo_list.length; i++) {
    const list_item = todo_list[i];

    if (list_item.title === title) {
      list_item.status = list_item.status ? false : true;
    }
  }
  syncStorag();
}

function addItem(item) {
  const next_item = {
    title: item.title,
    status: item.status,
  };
  todo_list.push(next_item);
}

function onRemove() {
  const newItem = todo_list.filter((item) => {
    if (item.status === true) {
      return false;
    } else {
      return true;
    }
  });

  todo_list = newItem;
  syncStorag();
  renderList();
}

function onFilter_select(event) {
  if (event.target.value === "done") {
    loadFromStorage();
    const item_done = todo_list.filter((item) => {
      if (item.status === true) {
        return true;
      }
    });
    todo_list = item_done;
    renderList();
  } else if (event.target.value === "todo") {
    loadFromStorage();
    const item_todo = todo_list.filter((item) => {
      if (item.status === false) {
        return true;
      }
    });
    todo_list = item_todo;
    renderList();
  } else if (event.target.value === "all") {
    loadFromStorage();
    const item_all = todo_list.filter((item) => {
      return true;
    });
    todo_list = item_all;
    renderList();
  }
}

function onSearch() {
  const val_search = search_input.value;
  if (!val_search) {
    alert("Write your title!");
  }
  loadFromStorage();
  const search_item = todo_list.filter((item) => {
    if (item.title === val_search) {
      return true;
    }
  });
  todo_list = search_item;
  renderList();
}

//Run your App

function events() {
  del_btn.addEventListener("click", onRemove);
  select.addEventListener("click", (e) => {
    onFilter_select(e);
  });

  search_btn.addEventListener("click",(e)=>{
    e.preventDefault();
    onSearch();
  });
  
  todo_from.addEventListener("submit",(e)=>{
    e.preventDefault();
    onAddItem();
  })
}

function checkInput() {
  title_input.addEventListener("keydown", () => {
    save_btn.classList.remove("btn-outline-success");
    save_btn.classList.add("btn-dark");
    if (title_input.value === "") {
      save_btn.classList.remove("btn-dark");
      save_btn.classList.add("btn-outline-success");
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
