import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/NoFlyZones';

import NoFlyZonesView from '../components/NoFlyZonesView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.noFlyZones;

export default asyncConnect(resolve, mapState, actions)(NoFlyZonesView);
