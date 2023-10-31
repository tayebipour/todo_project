
import { clearInput, renderItem, renderList, search_input, title_input } from "./dom.js";
import { addItem } from "./functionality.js";
import { loadFromStorage, syncStorag } from "./storage.js";
import { reset, todo_list } from "./store.js";


export function onRemove() {
    const newItem = todo_list.filter((item) => {
      if (item.status === true) {
        return false;
      } else {
        return true;
      }
    });
    reset(newItem);
    syncStorag();
    renderList();
  }
  
export function onFilter_select(event) {
    if (event.target.value === "done") {
      loadFromStorage();
      const item_done = todo_list.filter((item) => {
        if (item.status === true) {
          return true;
        }
      });
      reset(item_done);
      renderList();
  
    } else if (event.target.value === "todo") {
      loadFromStorage();
      const item_todo = todo_list.filter((item) => {
        if (item.status === false) {
          return true;
        }
      });
      reset(item_todo);
      renderList();
  
    } else if (event.target.value === "all") {
      loadFromStorage();
      const item_all = todo_list.filter((item) => {
        return true;
      });
      reset(item_all);
      renderList();
    }
  }
  
export function onSearch() {
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
    reset(search_item);
    renderList();
  }

  export function onAddItem() {
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