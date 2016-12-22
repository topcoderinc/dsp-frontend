import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'mission-list',
  name: 'Mission List', /* Breadcrumb name */
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const MissionList = require('./containers/MissionListContainer').default;
      const reducer = require('./modules/MissionList').default;

      injectReducer(store, {key: 'missionList', reducer});
      cb(null, MissionList);
    }, 'MissionList');
  },
});
