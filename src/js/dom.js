function addElement(parentSelector, tag, className, text, ...args) {
  const parentElement = document.querySelector(parentSelector)
  const newElement = document.createElement(tag);
  newElement.classList.add(className);
  if(text){
    newElement.textContent = text;
  }
  if(args.length !== 0) {
    for(let i = 0; i < args.length; i += 2){
      newElement.setAttribute(args[i], args[i + 1]);
    }
  }
  parentElement.appendChild(newElement);
}

function addTodo(todo) {
  addElement('.main-content', 'div', null, '', 'class', `${todo.priority} todo`);
  addElement('.todo', 'input', 'checkbox', '', 'type', 'checkbox');
  addElement('.todo', 'p', 'todo-name', todo.title);
  addElement('.todo', 'p', 'todo-date', todo.dueDate);
}

export {addElement, addTodo};