import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'my-request-status',
  name: 'MyRequestStatus', /* Breadcrumb name */
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const MyRequestStatus = require('./containers/MyRequestStatusContainer').default;
      const reducer = require('./modules/MyRequestStatus').default;

      injectReducer(store, { key: 'myRequestStatus', reducer });
      cb(null, MyRequestStatus);
    }, 'MyRequestStatus');
  },
});
