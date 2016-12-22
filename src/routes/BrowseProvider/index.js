import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'browse-provider',
  name: 'BrowseProvider', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const BrowseProvider = require('./containers/BrowseProviderContainer').default;
      const reducer = require('./modules/BrowseProvider').default;

      injectReducer(store, {key: 'browseProvider', reducer});
      cb(null, BrowseProvider);
    }, 'BrowseProvider');
  },
});
