import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/MyDrone';

import MyDroneView from '../components/MyDroneView';

const resolve = [{
  promise: ({store}) => store.dispatch(actions.load()),
}];

const mapState = (state) => state.myDrone;

export default asyncConnect(resolve, mapState, actions)(MyDroneView);
