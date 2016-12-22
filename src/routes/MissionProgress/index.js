import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'mission-progress',
  name: 'Mission-Progress', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const MissionProgress = require('./containers/MissionProgressContainer').default;
      const reducer = require('./modules/MissionProgress').default;

      injectReducer(store, {key: 'missionProgress', reducer});
      cb(null, MissionProgress);
    }, 'MissionProgress');
  },
});
