const projects = []
const getProjects = () => projects;

function createProject(name) {
  const todos = [];
  const getName = () => name;
  const getTodos = () => todos;
  const pushTodo = (newTodo) => todos.push(newTodo);
  return {getName, getTodos, pushTodo};
}

function pushProject(name) {
  const newProject = createProject(name);
  projects.push(newProject); 
}

function createTodo(title, dueDate, priority, details) {
  let checked = false;
  return {title, dueDate, priority, details,  checked};
}

export {getProjects, pushProject};