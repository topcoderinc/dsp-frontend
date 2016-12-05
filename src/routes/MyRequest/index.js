import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'my-request',
  name: 'Requests', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const MyRequest = require('./containers/MyRequestContainer').default;
      const reducer = require('./modules/MyRequest').default;

      injectReducer(store, { key: 'myRequest', reducer });
      cb(null, MyRequest);
    }, 'MyRequest');
  },
});
