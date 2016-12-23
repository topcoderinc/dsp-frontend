import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/MissionPlanner';
import {loadNfz} from 'store/modules/searchNFZ';

import MissionPlannerView from '../components/MissionPlannerView';

const resolve = [{
  promise: ({params, store}) => store.dispatch(actions.load(params.id)),
}];

const mapState = (state) => ({...state.missionPlanner, ...state.searchNFZ});

export default asyncConnect(resolve, mapState, {...actions, loadNfz})(MissionPlannerView);
