const todos = [];
const projects = [];

function createTodo(title, dueDate, priority, project, details) {
  let checked = false;
  todos.push({title, dueDate, priority, project, details, checked});
}

function getTodos() {
  return [...todos];
}

function deleteTodo(index) {
  todos.splice(index, 1);
}

function getProjects() {
  return [...projects];
}

function deleteProject(index) {
  projects.splice(index, 1);
}

function pushProject(name) {
  projects.push(name);
}

export {createTodo, getTodos, deleteTodo, getProjects, deleteProject, pushProject};