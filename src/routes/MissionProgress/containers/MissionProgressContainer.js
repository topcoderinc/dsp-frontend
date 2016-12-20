import { asyncConnect } from 'redux-connect';
import {actions} from '../modules/MissionProgress';

import MissionProgressView from '../components/MissionProgressView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.missionProgress;

export default asyncConnect(resolve, mapState, actions)(MissionProgressView);
