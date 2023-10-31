// work with storage

import { todo_list , reset } from "./store.js";

export function syncStorag() {
    localStorage.setItem("my_list", JSON.stringify(todo_list));
  }
  
  export function loadFromStorage() {
    const listFromStorage = JSON.parse(localStorage.getItem("my_list")) || [];
    reset(listFromStorage);
  }
  