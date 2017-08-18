import React from 'react';
import * as TodoStore from '../../stores/TodoStore';
import TodoAction from '../../actions/TodoAction';
import Statics from './Statics';
import List from './List';
import CreateTodo from './CreateTodo';
import Editor from './Editor';
import './main.scss';

// only Todo can reach store and action!
class Todo extends React.Component {
  static handleClick(e) {
    const targetClassName = e.target.className;
    switch (targetClassName) {
      case 'delete-btn': TodoAction.delete(e.target.value);
        break;
      case 'checkbox': TodoAction.check(e.target.value);
        break;
      case 'edit':
        TodoAction.toggleEditor(e.target.value);
        break;
      default:
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      todos: TodoStore.getAll(),
      hideDone: TodoStore.getHide(),
      donePercent: TodoStore.getDonePercent(),
      // showEditor: TodoStore.getEditorState(),
      selectedItem: null,
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    TodoStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState({
      todos: TodoStore.getAll(),
      hideDone: TodoStore.getHide(),
      donePercent: TodoStore.getDonePercent(),
      // showEditor: TodoStore.getEditorState(),
      selectedItem: TodoStore.getSelectedItem(),
    });
  }
  render() {
    return (
      <div onClick={Todo.handleClick} role="presentation">
        <List
          items={this.state.todos}
          hideDone={this.state.hideDone}
          hideHandle={TodoAction.hide}
        />
        {(this.state.selectedItem ? <Editor
          item={this.state.selectedItem}
          onSave={TodoAction.save}
          onCancel={TodoAction.cancelEdit}
        /> : null)}
        <CreateTodo onCreate={TodoAction.create} />
        <Statics donePercent={this.state.donePercent} />
      </div>
    );
  }
}

export default Todo;
