import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/PilotMissions';

import PilotMissionsView from '../components/PilotMissionsView';

const resolve = [{
  promise: ({store}) => store.dispatch(actions.load()),
}];

const mapState = (state) => ({...state.pilotMissions});

export default asyncConnect(resolve, mapState, actions)(PilotMissionsView);
