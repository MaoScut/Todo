// you combine your components in index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './components/Todo';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

// render(App);

// // Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./components/Todo', () => {
//     // const NextApp = require('./components/Todo').default;
//     render(App);
//   });
// }

// ReactDOM.render(
//   <AppContainer>
//     <App />
//   </AppContainer>,
//   document.getElementById('root'),
// );
render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Todo', () => {
    const NextApp = require('./components/Todo').default;
    // ReactDOM.render(
    //   <AppContainer>
    //     <NextApp />
    //   </AppContainer>,
    //   document.getElementById('root'),
    // );
    render(NextApp);
  });
}
