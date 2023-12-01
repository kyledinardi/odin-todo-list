function addElement(parentSelector, tag, className, text) {
  const parentElement = document.querySelector(parentSelector)
  const newElement = document.createElement(tag);
  newElement.classList.add(className);
  if(text){
    newElement.textContent = text;
  }
  parentElement.appendChild(newElement);
}

export default addElement;