import uuid from 'uuid';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

// warning: every function has 'this', so you must call these functions as a store's method!
let todos = [{
  id: uuid.v4(),
  content: 'first one',
  checked: false,
},
{
  id: uuid.v4(),
  content: 'second one',
  checked: false,
}];
let hideDone = false;
const TodoStore = Object.assign({}, EventEmitter.prototype, {
  getAll() {
    return todos;
  },
  addTodo(todo) {
    todos.push(todo);
  },
  deleteTodo(id) {
    todos = todos.filter(item => item.id !== id);
  },
  checkItem(id) {
    const item = todos.find(v => v.id === id);
    item.checked = !item.checked;
    // todos.find(v => v.id === id).
  },
  toggle() {
    hideDone = !hideDone;
  },
  getHide() {
    return hideDone;
  },
  emitChange() {
    this.emit('change');
  },
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },
});
AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'CREATE_TODO':
      TodoStore.addTodo(action.todo);
      TodoStore.emitChange();
      break;
    case 'DELETE_TODO':
      TodoStore.deleteTodo(action.id);
      TodoStore.emitChange();
      break;
    case 'CHECK_TODO':
      TodoStore.checkItem(action.id);
      TodoStore.emitChange();
      break;
    case 'HIDE_TODO':
      TodoStore.toggle();
      TodoStore.emitChange();
      break;
    default:
      throw Error('Uncaught action type!');
  }
});

export default TodoStore;
