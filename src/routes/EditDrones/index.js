import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'edit-drones',
  name: 'Edit Drones', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const EditDrones = require('./containers/EditDronesContainer').default;
      const reducer = require('./modules/EditDrones').default;

      injectReducer(store, {key: 'editDrones', reducer});
      cb(null, EditDrones);
    }, 'EditDrones');
  },
});
