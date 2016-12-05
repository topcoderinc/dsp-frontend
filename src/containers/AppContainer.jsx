import React, { PropTypes } from 'react';
import { ReduxAsyncConnect } from 'redux-connect';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

const AppContainer = ({ history, routes, routerKey, store }) => (
  <Provider store={store}>
    <Router history={history} render={(props) => <ReduxAsyncConnect {...props} />} key={routerKey}>{routes}</Router>
  </Provider>
);

AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  routerKey: PropTypes.number,
  store: PropTypes.object.isRequired,
};

export default AppContainer;
