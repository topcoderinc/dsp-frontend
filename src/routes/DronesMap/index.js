import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'drones-map',
  name: 'DronesMap', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const DronesMap = require('./containers/DronesMapContainer').default;
      const reducer = require('./modules/DronesMap').default;

      injectReducer(store, { key: 'dronesMap', reducer });
      cb(null, DronesMap);
    }, 'DronesMap');
  },
});
