// server

import { renderItem } from "./dom.js";
import { addItem } from "./functionality.js";

export function fetch_server() {
    const todos_list_api = "https://jsonplaceholder.typicode.com/todos";
    fetch(todos_list_api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.forEach((item) => {
          const data_list = {
            title: item.title,
            status: item.completed,
          };
          addItem(data_list);
          renderItem(data_list);
        });
      })
      .catch((err) => alert("cannot load api"));
  }