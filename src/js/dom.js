import editSVG from '../square-edit-outline.svg';
import deleteSVG from '../delete.svg';

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

function addEventListeners(){
  const dialog = document.querySelector('dialog');
  const form = document.querySelector('form');
  const newTodoBtn = document.querySelector('.new-todo-btn');
  const cancelBtn = document.querySelector('.cancel-btn');
  const confirmBtn = document.querySelector('.confirm-btn');

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

  confirmBtn.addEventListener('click', () => {

  });
}

export {addElement, addEventListeners};