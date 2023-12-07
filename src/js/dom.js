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

function openForm(project, todo) {
  const dialog = document.querySelector('dialog');
  const form = document.querySelector('form');
  const confirmBtn = document.querySelector('.confirm-btn')

  if(project && todo){
    confirmBtn.textContent = 'Edit Task';
    form.setAttribute('data-edit', 'true');
    form.setAttribute('data-project', project)
    form.setAttribute('data-todo', todo);
    const title = document.querySelector('.title-input');
    const dueDate = document.querySelector('#due-date');
    const priority = document.querySelector('.priority-select');
    const projectName = document.querySelector('.project-select');
    const details = document.querySelector('.details-input');
    title.value = getProjects()[project].getTodos()[todo].title;
    dueDate.value = getProjects()[project].getTodos()[todo].dueDate;
    priority.value = getProjects()[project].getTodos()[todo].priority;
    projectName.value = getProjects()[project].getName();
    
    if(details.value) {
      details.value = getProjects()[project].getTodos()[todo].details;
    }
  } else{
    confirmBtn.textContent = 'Add Task';
    form.setAttribute('data-edit', 'false')
    form.reset();
  }

  dialog.showModal();
}

function submitForm(project, todo) {
  const form = document.querySelector('form');
  const title = document.querySelector('.title-input').value;
  const dueDate = document.querySelector('#due-date').value;
  const priority = document.querySelector('.priority-select').value;
  const projectName = document.querySelector('.project-select').value;
  const details = document.querySelector('.details-input').value;
  const newTodo = createTodo(title, dueDate, priority, details);

  const projectWithNewTodo = getProjects().find((project) => {
    return project.getName() === projectName;
  });

  if(form.dataset.edit = true) {
    getProjects()[form.dataset.project].deleteTodo(form.dataset.todo);
  }
  
  projectWithNewTodo.pushTodo(newTodo);
  buildTodoList();
}

function addEventListeners(){
  const dialog = document.querySelector('dialog');
  const form = document.querySelector('form');
  const newTodoBtn = document.querySelector('.new-todo-btn');
  const cancelBtn = document.querySelector('.cancel-btn');
  const newProjectBtn = document.querySelector('.new-project-btn');

  newTodoBtn.addEventListener('click', openForm);
  
  cancelBtn.addEventListener('click', () => {
    dialog.close();
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

  form.addEventListener('submit', submitForm);

  pushProject('Project 1');
  buildProjectLists();

  getProjects()[0].getTodos()[0] = {
    title: 'Brush teeth',
    dueDate: '2023-12-07', 
    priority: 'high', 
    checked: false,
  };

  getProjects()[0].getTodos()[1] = {
    title: 'Do laundry',
    dueDate: '2023-12-07', 
    priority: 'medium', 
    checked: false,
  };

  buildTodoList();
}

export {addElement, addEventListeners, openForm};