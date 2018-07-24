import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

function CreateTodo({ onCreate }) {
  let textInput = null;
  return (
    <div>
      <input type="text" ref={(input) => { textInput = input; }} />请输入待办事项
      <input
        type="submit"
        value="提交"
        onClick={() => {
          if (textInput.value !== '') {
            onCreate({
              content: textInput.value,
              id: uuid.v4(),
              checked: false,
            });
          }
        }}
      />
    </div>
  );
}
CreateTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default CreateTodo;
