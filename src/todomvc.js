import uuid from 'uuid';

function View(ul) {
  function render(model) {
    ul.innerHTML = '';
    model.forEach(m => {
      const li = document.createElement('li');
      li.innerText = m.text;
      ul.appendChild(li);
    })
  }
  return {
    render,
  };
}
function Model() {
  const list = [];
  function add(m) {
    list.push(m);
  }
  return {
    add,
    list,
  };
}
const controller = (function() {
  let addBtn = null;
  let removeBtn = null;
  let ul = null;
  let container = null;
  let view = null;
  let model = null;
  function init() {
    container = document.getElementById('root');
    ul = document.createElement('ul');
    addBtn = document.createElement('button');
    addBtn.innerText = 'add';
    container.appendChild(ul);
    container.appendChild(addBtn);
    view = View(ul);
    model = Model();
    addBtn.onclick = function() {
      model.add({
        id: uuid.v4(),
        text: 'hahaha',
      });
      view.render(model.list);
    }
    removeBtn = document.createElement('button');
    removeBtn.innerText = 'remove';
  }
  return {
    init,
  }
})();
controller.init();
