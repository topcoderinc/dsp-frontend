import { asyncConnect } from 'redux-connect';
import { actions } from '../modules/MissionList';

import MissionListView from '../components/MissionListView';

const resolve = [{
  promise: ({ store }) => store.dispatch(actions.load()),
}];

const mapState = (state) => state.missionList;

export default asyncConnect(resolve, mapState, actions)(MissionListView);
