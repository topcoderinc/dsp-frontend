import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import makeRootReducer from './reducers';

export default (initialState = {}, history) => {
  const middleware = [thunk, routerMiddleware(history)];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger({ collapsed: true }));
  }
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f, // redux dev tool extenstion for chrome
    )
  );
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;

      store.replaceReducer(reducers(store.asyncReducers));
    });
  }
  return store;
};
