import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'dashboard',
  name: 'Dashboard', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Dashboard = require('./containers/DashboardContainer').default;
      const reducer = require('./modules/Dashboard').default;

      injectReducer(store, {key: 'dashboard', reducer});
      cb(null, Dashboard);
    }, 'Dashboard');
  },
});
