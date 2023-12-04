const projects = []
const getProjects = () => projects;

function createProject(name) {
  const todos = [];
  const getName = () => name;
  const getTodos = () => todos;
  const pushTodo = (newTodo) => todos.push(newTodo);
  return {getName, getTodos, pushTodo};
}

function pushProject(project) {
  projects.push(project);
}

function createTodo(title, dueDate, priority, details) {
  let checklist = false;
  return {title, dueDate, priority, details,  checklist};
}

export {getProjects, pushProject};