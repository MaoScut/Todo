import React from 'react';
// import PropTypes from 'prop-types';
import TodoStore from '../../stores/TodoStore';
import TodoAction from '../../actions/TodoAction';
import Statics from './Statics';
import List from './List';
import CreateTodo from './CreateTodo';
// import styles from './main.css';
import './main.scss';

// only Todo can reach store and action!
class Todo extends React.Component {
  static handleClick(e) {
    switch (e.target.tagName) {
      case 'BUTTON': TodoAction.delete(e.target.value);
        break;
      case 'INPUT': TodoAction.check(e.target.value);
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
    };
    // this.createTodo = this.createTodo.bind(this);
    // this.deleteTodo = this.deleteTodo.bind(this);
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
        <CreateTodo onCreate={TodoAction.create} />
        <Statics donePercent={this.state.donePercent} />
      </div>
    );
  }
}

export default Todo;
