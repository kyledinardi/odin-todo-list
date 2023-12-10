import editSVG from '../square-edit-outline.svg';
import deleteSVG from '../delete.svg';
import { addElement, openForm } from "./dom";
import { deleteTodo, getTodos } from './todos';

function buildTodoList(project) {
  document.querySelector('.todo-list').textContent = ''
  let sortedTodos;

  if(project) {
    const filteredTodos = getTodos().filter((todo) => todo.project === project);

    sortedTodos = filteredTodos.sort((a, b) => {
      if(a.dueDate > b.dueDate) return 1;
      if(b.dueDate > a.dueDate) return -1;
    });
  } else {
    sortedTodos = getTodos().sort((a, b) => {
      if(a.dueDate > b.dueDate) return 1;
      if(b.dueDate > a.dueDate) return -1;
    });
  }
  
  sortedTodos.forEach((todo) => {
    const i = getTodos().indexOf(todo);
    
    addElement(
      '.todo-list',
      'div',
      '',
      '',
      'class',
      `todo ${todo.priority}`,
      'data-index',
      `${i}`
    )

    addElement(
      `[data-index = '${i}']`,
      'input', 
      'todo-checkbox',
      '',
      'type',
      'checkbox'
    )
    
    addElement(
      `[data-index = '${i}']`,
      'p', 
      'todo-title', 
      todo.title
    );

    addElement(
      `[data-index = '${i}']`,
      'p', 
      'todo-due-date', 
      todo.dueDate
    );

    addElement(
      `[data-index = '${i}']`,
      'img', 
      'todo-edit',
      '',
      'src',
      editSVG, 
      'data-index',
      `${i}`
    );

    addElement(
      `[data-index = '${i}']`,
      'img', 
      'todo-delete',
      '',
      'src',
      deleteSVG, 
      'data-index',
      `${i}`
    );
  });
  
  addTodoEventListeners();
}

function addTodoEventListeners() {
  const editBtns = document.querySelectorAll('.todo-edit');
  const deleteBtns = document.querySelectorAll('.todo-delete');
  const todos = document.querySelectorAll('.todo');

  editBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      todos.forEach((todo) => {
        if(e.target.dataset.index === todo.dataset.index) {
          openForm(todo.dataset.index);
        }
      });
    })
  });
  
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      todos.forEach((todo) => {
        if(e.target.dataset.index === todo.dataset.index) {
          deleteTodo(todo.dataset.index);
          todo.remove();
        }
      })
    });
  });
}

export {buildTodoList};