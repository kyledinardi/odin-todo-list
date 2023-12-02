import {addElement} from "./dom";

(function(){
  addElement('body', 'h1', 'heading', 'TODO LIST');
  addElement('body', 'div', 'sidebar');
  addElement('body', 'div', 'main-content');
  addElement('.sidebar', 'h2', 'side-heading', 'Home');
  addElement('.sidebar', 'h2', 'side-heading', 'Today');
  addElement('.sidebar', 'h2', 'side-heading', 'Week');
  addElement('.sidebar', 'h2', 'side-heading', 'Projects');
  addElement('.sidebar', 'div', 'project-list')
})();