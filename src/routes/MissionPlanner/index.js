import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'mission-planner(/:id)',
  name: 'Mission Planner',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const MissionPlanner = require('./containers/MissionPlannerContainer').default;
      const reducer = require('./modules/MissionPlanner').default;

      injectReducer(store, { key: 'missionPlanner', reducer });
      cb(null, MissionPlanner);
    }, 'MissionPlanner');
  },
});
