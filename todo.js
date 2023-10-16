const save_btn = document.querySelector(".btn-success");
const del_btn = document.querySelector(".btn-danger");
const title_input = document.querySelector("#title");
const list = document.querySelector(".list");

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
  save_btn.classList.add("btn-success");
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
  } else {
    const item = {
      title: val,
      status: false,
    };
    addItem(item);
    syncStorag();
    renderItem(item);
    clearInput();
  }
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
  // for (let i = 0; i < todo_list.length; i++) {
  //   const list_item = todo_list[i];
  const newItem = todo_list.filter((item)=>{
    if (item.status === true) {
      return false;
    }else{
      return true;
    }
    
  });
    
    // }
  todo_list=newItem;
  syncStorag();
  renderList();
}

//Run your App

function events() {
  save_btn.addEventListener("click", onAddItem);
  del_btn.addEventListener("click", onRemove);
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
