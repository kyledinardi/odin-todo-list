import { getProjects, pushProject , createTodo} from './projects';
import { buildTodoList } from './todoList';

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
      project.getName(), 
      'value', 
      project.getName()
    );
    addElement('.project-list', 'li', 'project-li', project.getName());
  });
}

function addEventListeners(){
  const dialog = document.querySelector('dialog');
  const form = document.querySelector('form');
  const newTodoBtn = document.querySelector('.new-todo-btn');
  const cancelBtn = document.querySelector('.cancel-btn');
  const confirmBtn = document.querySelector('.confirm-btn');
  const newProjectBtn = document.querySelector('.new-project-btn');

  function handleDialogEscape(e) {
    if(e.key === 'Escape'){
      form.reset();
      removeEventListener('keydown', handleDialogEscape);
    }
  }

  newTodoBtn.addEventListener('click', () => {
    dialog.showModal();
    window.addEventListener('keydown', handleDialogEscape)
  });
  
  cancelBtn.addEventListener('click', () => {
    dialog.close();
    removeEventListener('keydown', handleDialogEscape);
  });

  newProjectBtn.addEventListener('click', () => {
    const newProjectInput = document.querySelector('.new-project-input');
    const projectNames = getProjects().map((project) => project.getName());
    if(newProjectInput.value && !projectNames.includes(newProjectInput.value)){
      pushProject(newProjectInput.value);
      buildProjectLists();
      const projectSelect = document.querySelector('.project-select');
      projectSelect.value = newProjectInput.value;
      newProjectInput.value = '';
    }
  });

  form.addEventListener('submit', () => {
    const title = document.querySelector('.title-input').value;
    const details = document.querySelector('.details-input').value;
    const dueDate = document.querySelector('#due-date').value;
    const priority = document.querySelector('.priority-select').value;
    const projectName = document.querySelector('.project-select').value;
    const newTodo = createTodo(title, dueDate, priority, details);

    const project = getProjects().find((project) => {
      return project.getName() === projectName;
    });

    project.pushTodo(newTodo);
    buildTodoList();
  });

  pushProject('Project 1');
  buildProjectLists();
  getProjects()[0].getTodos()[0] = {
    title: 'Brush teeth',
    dueDate: 'Today', 
    priority: 'high', 
    checked: false,
  };
  getProjects()[0].getTodos()[1] = {
    title: 'Do laundry',
    dueDate: 'Tomorrow', 
    priority: 'medium', 
    checked: false,
  };
  buildTodoList();
}

export {addElement, addEventListeners};