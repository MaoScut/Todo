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
  toggleEditor(id) {
    AppDispatcher.dispatch({
      actionType: 'TOGGLE_EDITOR',
      id,
    });
  },
  save(content) {
    AppDispatcher.dispatch({
      actionType: 'SAVE_ITEM',
      content,
    });
  },
  cancelEdit() {
    AppDispatcher.dispatch({
      actionType: 'CANCEL_EDIT',
    });
  },
};

export default TodoAction;
