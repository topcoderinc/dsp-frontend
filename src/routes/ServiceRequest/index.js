import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'service-request/:id',
  name: 'ServiceRequest', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ServiceRequest = require('./containers/ServiceRequestContainer').default;
      const reducer = require('./modules/ServiceRequest').default;

      injectReducer(store, {key: 'serviceRequest', reducer});
      cb(null, ServiceRequest);
    }, 'ServiceRequest');
  },
});
