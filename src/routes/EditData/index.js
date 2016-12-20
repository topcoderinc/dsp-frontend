import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'edit-data',
  name: 'Edit Data', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const EditData = require('./containers/EditDataContainer').default;
      const reducer = require('./modules/EditData').default;

      injectReducer(store, { key: 'editData', reducer });
      cb(null, EditData);
    }, 'EditData');
  },
});
