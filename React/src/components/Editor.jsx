import React from 'react';
import PropTypes from 'prop-types';

function Editor({ item, onSave, onCancel }) {
  let updateInput = null;
  function save() {
    if (updateInput.value !== '') {
      onSave(updateInput.value);
    }
  }
  function cancel() {
    onCancel();
  }
  return (
    <div>
      <input
        type="text"
        ref={(input) => { updateInput = input; }}
        defaultValue={item.content}
      />输入修改
      <button onClick={save}>更新</button>
      <button onClick={cancel}>取消</button>
    </div>
  );
}
Editor.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    checked: PropTypes.bool,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default Editor;
