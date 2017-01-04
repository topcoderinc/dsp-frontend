import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'reset-password',
  name: 'Reset password', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Dashboard = require('./containers/ResetPasswordContainer').default;
      const reducer = require('./modules/ResetPassword').default;

      injectReducer(store, {key: 'resetPassword', reducer});
      if (!nextState.location.query.token) {
        cb(new Error('Invalid route invocation'));
      } else {
        cb(null, Dashboard);
      }
    }, 'ResetPassword');
  },
});
