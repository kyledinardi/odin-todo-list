import { parseISO, format, compareAsc } from 'date-fns';
import editSVG from '../square-edit-outline.svg';
import deleteSVG from '../delete.svg';
import { addElement, openForm, openInfo, buildProjectLists } from './dom';
import {
  deleteTodo,
  deleteUnusedProjects,
  getTodos,
  populateStorage,
} from './todos';

function addTodoEventListeners() {
  const todoCheckbox = document.querySelectorAll('.todo-checkbox');
  const editBtns = document.querySelectorAll('.todo-edit');
  const deleteBtns = document.querySelectorAll('.todo-delete');
  const todos = document.querySelectorAll('.todo');

  todoCheckbox.forEach((box) => {
    box.addEventListener('change', (e) => {
      document.querySelector('.see-info').close();
      todos.forEach((todo) => {
        const i = todo.dataset.index;
        if (e.target.dataset.index === i) {
          const currentTodo = getTodos()[i];

          const checkBox = document.querySelector(
            `[type = 'checkbox'][data-index = '${i}']`,
          );

          if (currentTodo.checked) {
            currentTodo.checked = false;
            checkBox.removeAttribute('checked');
            todo.classList.remove('checked');
          } else {
            currentTodo.checked = true;
            checkBox.setAttribute('checked', '');
            todo.classList.add('checked');
          }
        }
      });
      populateStorage();
    });
  });

  editBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      todos.forEach((todo) => {
        if (e.target.dataset.index === todo.dataset.index) {
          openForm(todo.dataset.index);
          e.stopPropagation();
          buildProjectLists();
          deleteUnusedProjects();
        }
      });
    });
  });

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      todos.forEach((todo) => {
        if (e.target.dataset.index === todo.dataset.index) {
          deleteTodo(todo.dataset.index);
          todo.remove();
          e.stopPropagation();
          deleteUnusedProjects();
          buildProjectLists();
        }
      });
    });
  });

  todos.forEach((todo) => {
    todo.addEventListener('click', (e) => {
      if (e.target.dataset.index === todo.dataset.index) {
        openInfo(todo.dataset.index);
      }
    });
  });
}

function buildTodoList(project, today, week) {
  document.querySelector('.todo-list').textContent = '';
  let filteredTodos;
  let sortedTodos;
  const date = new Date();
  function futureDates(days) {
    const futureDate = `${date.getFullYear()}-${date.getMonth() + 1}-${
      date.getDate() + days
    }`;

    return futureDate;
  }

  if (project || today || week) {
    if (project) {
      filteredTodos = getTodos().filter((todo) => todo.project === project);
    } else if (today) {
      filteredTodos = getTodos().filter(
        (todo) => todo.dueDate === futureDates(0),
      );
    } else if (week) {
      filteredTodos = getTodos().filter((todo) => {
        for (let i = 0; i < 7; i += 1) {
          if (todo.dueDate === futureDates(i)) return true;
        }
        return false;
      });
    }

    sortedTodos = filteredTodos.sort((a, b) => {
      if (a.dueDate > b.dueDate) return 1;
      if (b.dueDate > a.dueDate) return -1;
      return 0;
    });
  } else {
    sortedTodos = getTodos().sort((a, b) => {
      if (a.dueDate > b.dueDate) return 1;
      if (b.dueDate > a.dueDate) return -1;
      return 0;
    });
  }

  sortedTodos.forEach((todo) => {
    const i = getTodos().indexOf(todo);
    const checkedAttribute = todo.checked ? 'checked' : null;
    let pastDue;

    if (compareAsc(date, parseISO(todo.dueDate)) === 1) {
      pastDue = 'true';
    } else {
      pastDue = 'false';
    }

    addElement(
      '.todo-list',
      'div',
      '',
      '',
      'class',
      `todo ${todo.priority} ${checkedAttribute}`,
      'data-index',
      `${i}`,
    );

    addElement(
      `[data-index = '${i}']`,
      'input',
      'todo-checkbox',
      '',
      'type',
      'checkbox',
      'data-index',
      `${i}`,
      checkedAttribute,
    );

    addElement(`[data-index = '${i}']`, 'p', 'todo-title', todo.title);

    addElement(
      `[data-index = '${i}']`,
      'p',
      'todo-due-date',
      format(parseISO(todo.dueDate), 'MM/dd/yyyy'),
      'past-due',
      pastDue,
    );

    addElement(`[data-index = '${i}']`, 'button', 'edit-btn');

    addElement(`[data-index = '${i}']`, 'button', 'delete-btn');

    addElement(
      `[data-index = '${i}'] .edit-btn`,
      'img',
      'todo-edit',
      '',
      'src',
      editSVG,
      'data-index',
      `${i}`,
    );

    addElement(
      `[data-index = '${i}'] .delete-btn`,
      'img',
      'todo-delete',
      '',
      'src',
      deleteSVG,
      'data-index',
      `${i}`,
    );
  });

  addTodoEventListeners();
}

export default buildTodoList;
