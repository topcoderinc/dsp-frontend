import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'status-detail/:id',
  name: 'StatusDetail', /* Breadcrumb name */
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const StatusDetail = require('./containers/StatusDetailContainer').default;
      const reducer = require('./modules/StatusDetail').default;

      injectReducer(store, {key: 'statusDetail', reducer});
      cb(null, StatusDetail);
    }, 'StatusDetail');
  },
});
