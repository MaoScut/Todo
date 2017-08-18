import React from 'react';
import PropTypes from 'prop-types';

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
  })).isRequired,
  hideDone: PropTypes.bool.isRequired,
  hideHandle: PropTypes.func.isRequired,
};

function TodoItem({ content, id, checked, hideDone }) {
  const className = checked && hideDone ? 'hidden' : '';
  return (
    <li className={className}>
      <input type="checkbox" className="checkbox" value={id} checked={checked} />
      {content}
      <button className="edit" value={id}>编辑</button>
      <button className="delete-btn" value={id}>删除</button>
    </li>
  );
}
TodoItem.propTypes = {
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  hideDone: PropTypes.bool.isRequired,
};

export default List;
