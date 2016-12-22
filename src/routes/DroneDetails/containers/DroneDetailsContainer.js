import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/DroneDetails';

import DroneDetailsView from '../components/DroneDetailsView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.droneDetails;

export default asyncConnect(resolve, mapState, actions)(DroneDetailsView);
