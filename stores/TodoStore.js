import uuid from 'uuid';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

// warning: every function has 'this', so you must call these functions as a store's method!
let todos = [{
  id: uuid.v4(),
  content: 'first one',
},
{
  id: uuid.v4(),
  content: 'second one',
}];
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
    default:
  }
});

export default TodoStore;
