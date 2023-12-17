const todos = [];
const projects = [];

function populateStorage() {
  localStorage.setItem('todoArray', JSON.stringify(todos));
  localStorage.setItem('projectArray', JSON.stringify(projects));
}

function createTodo(title, dueDate, priority, project, details) {
  const checked = false;
  todos.push({
    title,
    dueDate,
    priority,
    project,
    details,
    checked,
  });
  populateStorage();
}

function getTodos() {
  return [...todos];
}

function deleteTodo(index) {
  todos.splice(index, 1);
  populateStorage();
}

function getProjects() {
  return [...projects];
}

function deleteUnusedProjects() {
  projects.forEach((project, index) => {
    const todoProjects = todos.map((todo) => todo.project);
    if (!todoProjects.includes(project)) {
      projects.splice(index, 1);
    }
  });
  populateStorage();
}

function pushProject(name) {
  projects.push(name);
  populateStorage();
}

function countTodosInProjet(project) {
  let count = 0;
  const todoProjects = todos.map((todo) => todo.project);

  todoProjects.forEach((todoProject) => {
    if (project === todoProject) {
      count += 1;
    }
  });

  return count;
}

function setArrays() {
  const todoArray = JSON.parse(localStorage.getItem('todoArray'));
  const projectArray = JSON.parse(localStorage.getItem('projectArray'));

  todoArray.forEach((todo) => {
    todos.push(todo);
  });

  projectArray.forEach((project) => {
    projects.push(project);
  });
}

export {
  createTodo,
  getTodos,
  deleteTodo,
  getProjects,
  pushProject,
  populateStorage,
  setArrays,
  deleteUnusedProjects,
  countTodosInProjet,
};
