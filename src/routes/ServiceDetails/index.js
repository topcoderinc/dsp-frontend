import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'service-details',
  name: 'Service Details', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ServiceDetails = require('./containers/ServiceDetailsContainer').default;
      const reducer = require('./modules/ServiceDetails').default;

      injectReducer(store, {key: 'serviceDetails', reducer});
      cb(null, ServiceDetails);
    }, 'ServiceDetails');
  },
});
