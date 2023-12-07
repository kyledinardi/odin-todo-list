import editSVG from '../square-edit-outline.svg';
import deleteSVG from '../delete.svg';
import { addElement } from "./dom";
import { getProjects } from "./projects";

function buildTodoList() {
  document.querySelector('.todo-list').textContent = ''
  getProjects().forEach((project) => {
    const i = getProjects().indexOf(project);
    project.getTodos().forEach((todo) => {
      const j = project.getTodos().indexOf(todo);
      addElement(
        '.todo-list', 
        'div', 
        '', 
        '', 
        'class', 
        `todo ${todo.priority}`, 
        'data-project', 
        `${i}`,
        'data-todo',
        `${j}`,
      );
      addElement(
        `[data-project = '${i}'][data-todo = '${j}']`, 
        'input', 
        'todo-checkbox', 
        '', 
        'type', 
        'checkbox'
      );
      addElement(
        `[data-project = '${i}'][data-todo = '${j}']`,   
        'p', 
        'todo-title', 
        todo.title
      );
      addElement(
        `[data-project = '${i}'][data-todo = '${j}']`,   
        'p', 
        'todo-due-date', 
        todo.dueDate
      );
      addElement(
        `[data-project = '${i}'][data-todo = '${j}']`,  
        'img', 
        'todo-edit',
        '',
        'src',
        editSVG
      );
      addElement(
        `[data-project = '${i}'][data-todo = '${j}']`,  
        'img', 
        'todo-delete',
        '',
        'src',
        deleteSVG
      );
    });
  });
  addTodoEventListeners();
}

function addTodoEventListeners() {
  const editBtns = document.querySelectorAll('.todo-edit');
  const deleteBtns = document.querySelectorAll('.todo-delete');
  const todos = document.querySelectorAll('.todo');

  editBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      
    });
  });  
  
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      
    });
  });
}

export {buildTodoList};