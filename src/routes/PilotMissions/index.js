import {injectReducer} from '../../store/reducers';

export default (store) => ({
  name: 'Pilot Missions',
  path: 'pilot-missions',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const PilotMissions = require('./containers/PilotMissionsContainer').default;
      const reducer = require('./modules/PilotMissions').default;

      injectReducer(store, {key: 'pilotMissions', reducer});
      cb(null, PilotMissions);
    }, 'PilotMissions');
  },
});
