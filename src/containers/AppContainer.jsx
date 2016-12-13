import React, { PropTypes } from 'react';
import { ReduxAsyncConnect } from 'redux-connect';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

const AppContainer = ({ history, routes, routerKey, store }) => (
  <Provider store={store}>
    <div>
      <Router history={history} render={(props) => <ReduxAsyncConnect {...props} />} key={routerKey}>{routes}</Router>
      <ReduxToastr
        timeOut={3000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </div>
  </Provider>
);

AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  routerKey: PropTypes.number,
  store: PropTypes.object.isRequired,
};

export default AppContainer;
