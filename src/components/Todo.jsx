import uuid from 'uuid';
import React from 'react';
import PropTypes from 'prop-types';
import TodoStore from '../../stores/TodoStore';
import TodoAction from '../../actions/TodoAction';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: TodoStore.getAll(),
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
    });
  }
  // createTodo() {
  //   TodoAction.create({id:uuid.v4(),content: '3rd stuff'});
  // }
  // deleteTodo(id) {
  //   TodoAction.delete(id);
  // }
  render() {
    return (
      <div>
        <List items={this.state.todos} onDelete={TodoAction.delete} />
        <button onClick={() => TodoAction.create({ id: uuid.v4(), content: '3rd stuff' })}>createTodo</button>
      </div>
    );
  }
}

function List({ items, onDelete }) {
  const list = items.map(v => (
    <li key={v.id}>
      <button onClick={() => onDelete(v.id)}>delete</button>{v.content}
    </li>));
  return (
    <ul>
      {list}
    </ul>
  );
}
List.propTypes = {
  // items: PropTypes.shape({
  //   id: PropTypes.string,
  //   content: PropTypes.string,
  // }),
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
  })),
  onDelete: PropTypes.func,
};

export default Todo;
