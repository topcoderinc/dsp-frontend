import {injectReducer} from '../../../store/reducers';

export default (store) => ({
  path: 'dashboard',
  name: 'Dashboard',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const AdminDashboard = require('./containers/AdminDashboardContainer').default;
      const reducer = require('./modules/AdminDashboard').default;

      injectReducer(store, {key: 'adminDashboard', reducer});
      cb(null, AdminDashboard);
    }, 'AdminDashboard');
  },
});
