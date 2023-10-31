// Functionality



import { syncStorag } from "./storage.js";
import { todo_list } from "./store.js";


  
export function toggleStatus(title) {
    for (let i = 0; i < todo_list.length; i++) {
      const list_item = todo_list[i];
  
      if (list_item.title === title) {
        list_item.status = list_item.status ? false : true;
      }
    }
    syncStorag();
  }
  
export function addItem(item) {
    const next_item = {
      title: item.title,
      status: item.status,
    };
    todo_list.push(next_item);
  }
  
