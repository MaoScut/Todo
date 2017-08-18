import uuid from 'uuid';
import React from 'react';
import PropTypes from 'prop-types';
import TodoStore from '../../stores/TodoStore';
import TodoAction from '../../actions/TodoAction';
// import styles from './main.css';
import './main.scss';

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
      hideDone: TodoStore.getHide(),
    });
  }
  render() {
    return (
      <div>
        <List
          items={this.state.todos}
          hideDone={this.state.hideDone}
          hideHandle={TodoAction.hide}
        />
        <CreateTodo onCreate={TodoAction.create} />
      </div>
    );
  }
}

function List({ items, hideHandle, hideDone }) {
  const list = items.map((item) => {
    const { id, content, checked } = item;
    return (
      <TodoItem
        key={id}
        id={id}
        content={content}
        checked={checked}
        hideDone={hideDone}
        deleteHandle={TodoAction.delete}
        checkHandle={TodoAction.check}
      />
    );
  });
  const buttonText = hideDone ? '显示已完成事项' : '隐藏已完成事项';
  return (
    <div>
      <ul>
        {list}
      </ul>
      <button onClick={() => hideHandle()}>{buttonText}</button>
    </div>
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
  hideDone: PropTypes.bool,
  hideHandle: PropTypes.func,
};

function CreateTodo({ onCreate }) {
  let textInput = null;
  return (
    <div>
      <input type="text" ref={(input) => { textInput = input; }} />请输入待办事项
      <input
        type="submit"
        value="提交"
        onClick={() => onCreate({
          content: textInput.value,
          id: uuid.v4(),
          checked: false,
        })}
      />
    </div>
  );
}
CreateTodo.propTypes = {
  onCreate: PropTypes.func,
};

// todo item再加一个属性hidden
function TodoItem({ content, id, checked, hideDone, deleteHandle, checkHandle }) {
  const className = checked && hideDone ? 'hidden' : '';
  return (
    <li className={className}>
      <input type="checkbox" checked={checked} onClick={() => checkHandle(id)} />
      {content}
      <button className="delete-btn" onClick={() => deleteHandle(id)}>删除</button>
    </li>
  );
}
TodoItem.propTypes = {
  content: PropTypes.string,
  id: PropTypes.string,
  checked: PropTypes.bool,
  hideDone: PropTypes.bool,
  deleteHandle: PropTypes.func,
  checkHandle: PropTypes.func,
};


export default Todo;
