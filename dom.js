// work with dom

import { toggleStatus } from "./functionality.js";
import { todo_list } from "./store.js";

export const title_input = document.querySelector("#title");
const save_btn = document.querySelector(".btn-outline-success");
const list = document.querySelector(".list");
export const search_input = document.querySelector(".form-control");

export function renderItem(todo_item) {
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
  
 export function clearInput() {
    title_input.value = "";
    save_btn.classList.remove("btn-dark");
    save_btn.classList.add("btn-outline-success");
  }
  
  export function renderList() {
    // remove old item
    list.innerHTML = "";
    // new item
    for (let i = 0; i < todo_list.length; i++) {
      const item = todo_list[i];
      renderItem(item);
    }
  }
  
  export function checkInput() {
    title_input.addEventListener("keydown", () => {
      save_btn.classList.remove("btn-outline-success");
      save_btn.classList.add("btn-dark");
      if (title_input.value === "") {
        save_btn.classList.remove("btn-dark");
        save_btn.classList.add("btn-outline-success");
      }
    });
  }