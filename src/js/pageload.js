import {addElement} from "./dom";

function pageLoad(){
  addElement('body', 'h1', 'heading', 'TODO LIST');
  addElement('body', 'div', 'sidebar');
  addElement('body', 'div', 'main-content');
  addElement('.sidebar', 'h2', 'side-heading', 'Home');
  addElement('.sidebar', 'h2', 'side-heading', 'Today');
  addElement('.sidebar', 'h2', 'side-heading', 'Week');
  addElement('.sidebar', 'h2', 'side-heading', 'Projects');
  addElement('.sidebar', 'div', 'project-list');
  addElement('.main-content', 'button', 'new-todo-btn', 'New Task');
  addModal();
}

function addModal() {
  addElement('body', 'dialog');
  addElement('dialog', 'form');

  addElement(
    'form', 
    'input', 
    'title-input', 
    '', 
    'name', 
    'title', 
    'placeholder', 
    'Title: Cook dinner', 
    'required', 
    ''
  );

  addElement(
    'form', 
    'textarea', 
    'details-input', 
    '', 
    'name', 
    'details', 
    'placeholder', 
    'Details: Roasted chicken'
  );

  addElement('form', 'div', 'due-date-input');
  addElement('.due-date-input', 'label', '', 'Due Date: ', 'for', 'due-date');

  addElement(
    '.due-date-input',
    'input',
    '',
    '',
    'type',
    'date',
    'id',
    'due-date',
    'name',
    'due-date',
    'required',
    ''
  );

  addElement('form', 'div', 'priority-input');
  addElement('.priority-input', 'label', '', 'Priority: ', 'for', 'priority')

  addElement(
    '.priority-input', 
    'select', 
    'priority-select', 
    '', 
    'id',
    'priority',
    'name', 
    'priority', 
    'required', 
    ''
  );

  addElement('.priority-select', 'option', '', '', 'value', '');
  addElement('.priority-select', 'option', '', 'Low', 'value', 'low');
  addElement('.priority-select', 'option', '', 'Medium', 'value', 'medium');
  addElement('.priority-select', 'option', '', 'High', 'value', 'high');

  addElement('form', 'div', 'project-input');
  addElement('.project-input', 'label', '', 'Project: ', 'for', 'project');

  addElement(
    '.project-input', 
    'select', 
    'project-select', 
    '', 
    'id',
    'project',
    'name',
    'project',
    'required', 
    ''
  );

  addElement('.project-select', 'option', '', '', 'value', '');
  addElement('form', 'div', 'new-project')

  addElement(
    '.new-project', 
    'input', 
    'new-project-input', 
    '', 
    'placeholder', 
    'New Project'
  );
  addElement(
    '.new-project', 
    'button', 
    'new-project-btn', 
    'Add', 
    'type', 
    'button'
  );

  addElement('form', 'div', 'dialog-btns');
  addElement('.dialog-btns', 'button', 'confirm-btn', 'Add Task');

  addElement(
    '.dialog-btns', 
    'button', 
    'cancel-btn', 
    'Cancel', 
    'type', 
    'reset'
  );
}

export default pageLoad;