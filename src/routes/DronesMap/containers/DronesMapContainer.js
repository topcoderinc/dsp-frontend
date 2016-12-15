import { asyncConnect } from 'redux-connect';
import {actions} from '../modules/DronesMap';

import DronesMapView from '../components/DronesMapView';

const resolve = [{
  promise: ({ store }) => store.dispatch(actions.init()),
}];

const mapState = (state) => state.dronesMap;

export default asyncConnect(resolve, mapState, actions)(DronesMapView);
