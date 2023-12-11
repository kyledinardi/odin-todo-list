import editSVG from '../square-edit-outline.svg';
import deleteSVG from '../delete.svg';
import { addElement, openForm, openInfo } from "./dom";
import { deleteTodo, getTodos } from './todos';
import { parseISO, format } from 'date-fns';

function buildTodoList(project, today, week) {
  document.querySelector('.todo-list').textContent = ''
  let filteredTodos
  let sortedTodos;

  if(project || today || week) {
    const date = new Date;

    function futureDates(days) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + days}`
    }

    if(project) {
      filteredTodos = getTodos().filter((todo) => todo.project === project);
    } else if(today) {
      filteredTodos = getTodos().filter((todo) => todo.dueDate === futureDates(0));
    } else if(week) {
      filteredTodos = getTodos().filter((todo) => {
        for(let i = 0; i < 7; i++){
          if(todo.dueDate === futureDates(i)) return true;
        }
      });
    }

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
    let checkedAttribute
    todo.checked ? checkedAttribute = 'checked' : checkedAttribute = null;
    
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
      'checkbox',
      'data-index',
      `${i}`,
      checkedAttribute
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
      format(parseISO(todo.dueDate), 'MM/dd/yy')
    );

    addElement(
      `[data-index = '${i}']`,
      'button',
      'edit-btn'
    )

    addElement(
      `[data-index = '${i}']`,
      'button',
      'delete-btn',
    )

    addElement(
      `[data-index = '${i}'] .edit-btn`,
      'img', 
      'todo-edit',
      '',
      'src',
      editSVG, 
      'data-index',
      `${i}`
    );

    addElement(
      `[data-index = '${i}'] .delete-btn`,
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
  const todoCheckbox = document.querySelectorAll('.todo-checkbox');
  const editBtns = document.querySelectorAll('.todo-edit');
  const deleteBtns = document.querySelectorAll('.todo-delete');
  const todos = document.querySelectorAll('.todo');

  todoCheckbox.forEach((box) => {
    box.addEventListener('change', (e) => {
      document.querySelector('.see-info').close();
      todos.forEach((todo) => {
        if(e.target.dataset.index === todo.dataset.index) {
          const currentTodo =  getTodos()[todo.dataset.index];

          const checkBox = document.querySelector(
            `[type = 'checkbox'][data-index = '${todo.dataset.index}']`
          );
          
          if(currentTodo.checked) {
            currentTodo.checked = false;
            checkBox.removeAttribute('checked');
          } else {
            currentTodo.checked = true;
            checkBox.setAttribute('checked', '');
          }
        }
      });
    });
  });

  editBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      todos.forEach((todo) => {
        if(e.target.dataset.index === todo.dataset.index) {
          openForm(todo.dataset.index);
          e.stopPropagation();
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
          e.stopPropagation();
        }
      })
    });
  });

  todos.forEach((todo) => {
    todo.addEventListener('click', (e) => {
      if(e.target.dataset.index = todo.dataset.index) {
        openInfo(todo.dataset.index);
      }
    })
  });
}

export {buildTodoList};