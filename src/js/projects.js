const projects = []
const getProjects = () => projects;
const deleteProject = (i) => projects.splice(i, 1);

function createProject(name) {
  const todos = [];
  const getName = () => name;
  const getTodos = () => todos;
  const pushTodo = (newTodo) => todos.push(newTodo);
  const deleteTodo = (i) => todos.splice(i, 1);
  return {getName, getTodos, pushTodo, deleteTodo, todos};
}

function pushProject(name) {
  const newProject = createProject(name);
  projects.push(newProject); 
}

function createTodo(title, dueDate, priority, details) {
  let checked = false;
  return {title, dueDate, priority, details,  checked};
}

export {getProjects, pushProject, createTodo, deleteProject};