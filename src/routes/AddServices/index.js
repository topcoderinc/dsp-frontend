import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'add-services',
  name: 'Add Services', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const AddServices = require('./containers/AddServicesContainer').default;
      const reducer = require('./modules/AddServices').default;

      injectReducer(store, { key: 'addServices', reducer });
      cb(null, AddServices);
    }, 'AddServices');
  },
});
