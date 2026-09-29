const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo() {
  const message_todo = prompt("Name of TODO:")

  const elementToAdd = document.createElement('li')
  elementToAdd.textContent = message_todo
  list.appendChild(elementToAdd)
  elementToAdd.addClass(classNames.TODO_ITEM)

  // increases the counts
  itemCountSpan.textContent = parseInt(itemCountSpan.textContent, 10) + 1;
  uncheckedCountSpan.textContent = parseInt(uncheckedCountSpan.textContent, 10) + 1;
}
