import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/DroneDetails';

import DroneDetailsView from '../components/DroneDetailsView';

const resolve = [{
  promise: ({store, params}) => store.dispatch(actions.load(params.id)),
}];

const mapState = (state) => state.droneDetails;

export default asyncConnect(resolve, mapState, actions)(DroneDetailsView);
