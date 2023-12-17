import { addElement } from './dom';
import { populateStorage, setArrays } from './todos';

if (!localStorage.getItem('todoArray')) {
  populateStorage();
} else {
  setArrays();
}

function addModal() {
  addElement('body', 'dialog');
  addElement('dialog', 'form', '', '', 'method', 'dialog');

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
    '',
  );

  addElement(
    'form',
    'textarea',
    'details-input',
    '',
    'name',
    'details',
    'placeholder',
    'Details: Roasted chicken',
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
    '',
  );

  addElement('form', 'div', 'priority-input');
  addElement('.priority-input', 'label', '', 'Priority: ', 'for', 'priority');

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
    '',
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
    '',
  );

  addElement('.project-select', 'option', 'project-option', '', 'value', '');

  addElement('form', 'div', 'new-project', '', 'data-edit', 'false');

  addElement(
    '.new-project',
    'input',
    'new-project-input',
    '',
    'placeholder',
    'New Project',
  );

  addElement(
    '.new-project',
    'button',
    'new-project-btn',
    'Add',
    'type',
    'button',
  );

  addElement('form', 'div', 'dialog-btns');
  addElement('.dialog-btns', 'button', 'confirm-btn');

  addElement('.dialog-btns', 'button', 'cancel-btn', 'Cancel', 'type', 'reset');

  addElement('body', 'dialog', 'see-info');
  addElement('.see-info', 'div', 'see-info-div');
  addElement('.see-info-div', 'p', '', 'Task: ');
  addElement('.see-info-div', 'p', 'see-title');
  addElement('.see-info-div', 'p', '', 'Details: ');
  addElement('.see-info-div', 'p', 'see-details');
  addElement('.see-info-div', 'p', '', 'Due Date: ');
  addElement('.see-info-div', 'p', 'see-date');
  addElement('.see-info-div', 'p', '', 'Priority: ');
  addElement('.see-info-div', 'p', 'see-priority');
  addElement('.see-info-div', 'p', '', 'Project: ');
  addElement('.see-info-div', 'p', 'see-project');
  addElement('.see-info-div', 'button', 'info-close', 'Close');
}

function pageLoad() {
  addElement('body', 'h1', 'heading', 'TODO LIST');
  addElement('body', 'div', 'sidebar');
  addElement('body', 'div', 'main-content');
  addElement('.sidebar', 'h2', '', 'Home', 'class', 'side-heading home');
  addElement('.sidebar', 'h2', '', 'Today', 'class', 'side-heading today');
  addElement('.sidebar', 'h2', '', 'Week', 'class', 'side-heading week');
  addElement('.sidebar', 'h2', 'side-heading', 'Projects');
  addElement('.sidebar', 'ul', 'project-list');
  addElement('.main-content', 'div', 'todo-list');
  addElement('.main-content', 'button', 'new-todo-btn', 'New Task');
  addModal();
}

export default pageLoad;
