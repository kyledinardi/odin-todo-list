import { buildTodoList } from './todoList';
import { createTodo, deleteTodo, getTodos, getProjects, pushProject } from './todos';

function addElement(parentSelector, tag, className, text, ...args) {
  const parentElement = document.querySelector(parentSelector);
  const newElement = document.createElement(tag);

  if(className){
    newElement.classList.add(className);
  }

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

function buildProjectLists() {
  const projectSelect = document.querySelector('.project-select');
  const projectList = document.querySelector('.project-list');
  projectSelect.textContent = '';
  projectList.textContent = '';
  addElement('.project-select', 'option', 'project-option', '', 'value', '')
  getProjects().forEach((project) => {
    addElement(
      '.project-select', 
      'option', 
      'project-option', 
      project, 
      'value', 
      project
    );
    
    addElement('.project-list', 'li', 'project-li', project);
  });

  const projectLIs = document.querySelectorAll('.project-li')

  projectLIs.forEach((li) => {
    li.addEventListener('click', (e) => {
      buildTodoList(e.target.textContent);
    })
  })
}

function openForm(todoIndex) {
  const dialog = document.querySelector('dialog');
  const form = document.querySelector('form');
  const confirmBtn = document.querySelector('.confirm-btn')

  if(todoIndex) {
    confirmBtn.textContent = 'Edit Task';
    const currentTodo = getTodos()[todoIndex];
    form.setAttribute('data-edit', 'true');
    form.setAttribute('data-index', todoIndex);
    const title = document.querySelector('.title-input');
    const dueDate = document.querySelector('#due-date');
    const priority = document.querySelector('.priority-select');
    const projectName = document.querySelector('.project-select');
    const details = document.querySelector('.details-input');
    title.value = currentTodo.title;
    dueDate.value = currentTodo.dueDate;
    priority.value = currentTodo.priority;
    projectName.value = currentTodo.project;

    if(currentTodo.detais) {
      details.value = currentTodo.details;
    }
  } else {
    confirmBtn.textContent = 'Add Task';
    form.setAttribute('data-edit', 'false')
    form.reset;
  }

  dialog.showModal();
}

function submitForm() {
  const form = document.querySelector('form');
  const title = document.querySelector('.title-input').value;
  const dueDate = document.querySelector('#due-date').value;
  const priority = document.querySelector('.priority-select').value;
  const details = document.querySelector('.details-input').value;
  const project = document.querySelector('.project-select').value;
  createTodo(title, dueDate, priority, project, details);

  if(form.getAttribute('data-edit') === 'true') {
    deleteTodo(parseInt(form.getAttribute('data-index')));
  }

  buildTodoList();
}

function openInfo(todoIndex) {
  const infoDialog = document.querySelector('.see-info');
  const seeTitle = document.querySelector('.see-title');
  const seeDetails = document.querySelector('.see-details');
  const seeDate = document.querySelector('.see-date');
  const seePriority = document.querySelector('.see-priority');
  const seeProject = document.querySelector('.see-project');
  const priority = getTodos()[todoIndex].priority;
  const priorityCapital = 
    `${priority.charAt(0).toUpperCase()}${priority.slice(1)}`;
  seeTitle.textContent = getTodos()[todoIndex].title;
  seeDetails.textContent = getTodos()[todoIndex].details;
  seeDate.textContent = getTodos()[todoIndex].dueDate;
  seePriority.textContent = priorityCapital;
  seeProject.textContent = getTodos()[todoIndex].project;
  infoDialog.showModal();
}

function addEventListeners(){
  const dialog = document.querySelector('dialog');
  const form = document.querySelector('form');
  const newTodoBtn = document.querySelector('.new-todo-btn');
  const cancelBtn = document.querySelector('.cancel-btn');
  const seeInfo = document.querySelector('.see-info');
  const infoClose = document.querySelector('.info-close');
  const newProjectBtn = document.querySelector('.new-project-btn');
  const home = document.querySelector('.home');
  const today = document.querySelector('.today');
  const week = document.querySelector('.week')

  newTodoBtn.addEventListener('click', () => {
    openForm();
  });

  cancelBtn.addEventListener('click', () => {
    dialog.close();
  });

  form.addEventListener('submit', submitForm);

  infoClose.addEventListener('click', () => {
    seeInfo.close();
  });

  newProjectBtn.addEventListener('click', () => {
    const newProjectInput = document.querySelector('.new-project-input');
    const isInProjects = getProjects().includes(newProjectInput.value);

    if(newProjectInput.value && !isInProjects) {
      pushProject(newProjectInput.value);
      buildProjectLists();
      const projectSelect = document.querySelector('.project-select');
      projectSelect.value = newProjectInput.value;
      newProjectInput.value = '';
    }
  });

  home.addEventListener('click', () => {
    buildTodoList();
  });

  today.addEventListener('click', () => {
    buildTodoList(false, true)
  });

  week.addEventListener('click', () => {
    buildTodoList(false, false, true)
  });

  pushProject('Project 1');
  pushProject('Project 2');
  buildProjectLists();
  createTodo('Brush teeth', '2023-12-10', 'high', 'Project 1');
  createTodo('Do laundry', '2023-12-11', 'medium', 'Project 1',);
  createTodo('Shower', '2023-11-07', 'low', 'Project 2');
  buildTodoList();
}

export {addElement, addEventListeners, openForm, openInfo};