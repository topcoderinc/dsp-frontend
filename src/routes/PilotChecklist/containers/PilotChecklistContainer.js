import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/PilotChecklist';

import PilotChecklistView from '../components/PilotChecklistView';

const resolve = [{
  promise: ({store, params}) => store.dispatch(actions.load(params.id)),
}];

const mapState = (state) => state.pilotChecklist;

export default asyncConnect(resolve, mapState, actions)(PilotChecklistView);
