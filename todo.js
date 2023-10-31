import{loadFromStorage } from "./storage.js";
import{ renderList, checkInput } from "./dom.js";
import { fetch_server } from "./onServer.js";
import { fetch_server } from "./api/todos.js";
import {onAddItem , onFilter_select,onSearch ,onRemove } from "./events.js";


const del_btn = document.querySelector(".btn-outline-danger");
const select = document.getElementById("filter");
const search_btn = document.querySelector(".btn-outline-dark");
const todo_from = document.querySelector("#todo-from");


function events() {
  del_btn.addEventListener("click", onRemove);
  select.addEventListener("click", (e) => {
    onFilter_select(e);
  });

  search_btn.addEventListener("click", (e) => {
    e.preventDefault();
    onSearch();
  });

  todo_from.addEventListener("submit", (e) => {
    e.preventDefault();
    onAddItem();
  });

 fetch_server();

 
}



function init() {
  checkInput();
  loadFromStorage();
  renderList();
  events();
}

init();
