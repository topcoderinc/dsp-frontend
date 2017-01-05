import {injectReducer} from '../../store/reducers';

export default (store) => ({
  name: 'Pilot Checklist',
  path: 'pilot-checklist/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const PilotChecklist = require('./containers/PilotChecklistContainer').default;
      const reducer = require('./modules/PilotChecklist').default;

      injectReducer(store, {key: 'pilotChecklist', reducer});
      cb(null, PilotChecklist);
    }, 'PilotChecklist');
  },
});
