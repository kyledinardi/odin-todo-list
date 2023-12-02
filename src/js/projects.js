import { addTodo } from './dom.js';

const projects = []

function createProject(name) {
  const todos = [];
  const getName = () => name;
  const getTodos = () => todos;
  const pushTodo = (newTodo) => todos.push(newTodo);
  return {getName, getTodos, pushTodo};
}

function createTodo(title, dueDate, priority, details) {
  let checklist = false;
  return {title, dueDate, priority, details,  checklist};
}

const newTodo = createTodo('Brush teeth', 'Now', 'high');
addTodo(newTodo)