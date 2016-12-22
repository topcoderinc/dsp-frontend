import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'my-services',
  name: 'My Services', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const MyServices = require('./containers/MyServicesContainer').default;
      const reducer = require('./modules/MyServices').default;

      injectReducer(store, {key: 'myServices', reducer});
      cb(null, MyServices);
    }, 'MyServices');
  },
});
