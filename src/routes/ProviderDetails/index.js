import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'provider-details',
  name: 'Provider', /* Breadcrumb name */
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ProviderDetails = require('./containers/ProviderDetailsContainer').default;
      const reducer = require('./modules/ProviderDetails').default;

      injectReducer(store, { key: 'providerDetails', reducer });
      cb(null, ProviderDetails);
    }, 'ProviderDetails');
  },
});
