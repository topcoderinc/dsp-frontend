import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'available-packages',
  name: 'Available Packages', /* Breadcrumb name */
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const AvailablePackages = require('./containers/AvailablePackagesContainer').default;
      const reducer = require('./modules/AvailablePackages').default;

      injectReducer(store, {key: 'availablePackages', reducer});
      cb(null, AvailablePackages);
    }, 'AvailablePackages');
  },
});
