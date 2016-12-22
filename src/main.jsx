/* eslint import/no-commonjs: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import bluebird from 'bluebird';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';

require('babel-runtime/core-js/promise').default = bluebird;

const store = createStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router,
});

const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = require('./routes/index').default(store);

  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
    />,
    MOUNT_NODE
  );
};


// HMR
if (module.hot) {
  const orgRender = render;
  render = () => {
    try {
      orgRender();
    } catch (error) {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    }
  };
  module.hot.accept('./routes/index', () =>
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    })
  );
}

render();
