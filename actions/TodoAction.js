import AppDispatcher from '../dispatcher/AppDispatcher';

const TodoAction = {
  create(todo) {
    AppDispatcher.dispatch({
      actionType: 'CREATE_TODO',
      todo,
    });
  },
  delete(id) {
    AppDispatcher.dispatch({
      actionType: 'DELETE_TODO',
      id,
    });
  },
  check(id) {
    AppDispatcher.dispatch({
      actionType: 'CHECK_TODO',
      id,
    });
  },
  hide() {
    AppDispatcher.dispatch({
      actionType: 'HIDE_TODO',
    });
  },
};

export default TodoAction;
