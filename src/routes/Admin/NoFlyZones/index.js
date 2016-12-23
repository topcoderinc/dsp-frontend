import {injectReducer} from '../../../store/reducers';

export default (store) => ({
  path: 'no-fly-zones',
  name: 'No Fly Zones',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const NoFlyZones = require('./containers/NoFlyZonesContainer').default;
      const reducer = require('./modules/NoFlyZones').default;

      injectReducer(store, {key: 'noFlyZones', reducer});
      cb(null, NoFlyZones);
    }, 'NoFlyZones');
  },
});
