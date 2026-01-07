window.addEventListener("load", populateTodoList);

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoListElement = document.getElementById("todo-list");

function populateTodoList() {
  const todoListItems = ["Test Item"];

  todoListItems.forEach((item) => {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = `
        <span class="task-text">${item}</span>
        <button class="delete-btn">Delete</button>
    `;
    newListItem.querySelector(".delete-btn").addEventListener("click", () => {
      newListItem.remove();
    });
    todoListElement.appendChild(newListItem);
  });
}

function addTodo() {
  const newListItem = document.createElement("li");
  const taskValue = input.value.trim();

  if (!taskValue) {
    // Add some notification
    return;
  }

  newListItem.innerHTML = `
        <span class="task-text">${taskValue}</span>
        <button class="delete-btn">Delete</button>
    `;

  newListItem.querySelector(".delete-btn").addEventListener("click", () => {
    newListItem.remove();
  });

  todoListElement.appendChild(newListItem);
  input.value = "";
}

addBtn.addEventListener("click", addTodo);
