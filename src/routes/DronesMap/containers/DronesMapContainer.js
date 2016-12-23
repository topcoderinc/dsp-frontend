import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/DronesMap';
import {loadNfz} from 'store/modules/searchNFZ';

import DronesMapView from '../components/DronesMapView';

const resolve = [{
  promise: ({store}) => store.dispatch(actions.init()),
}];

const mapState = (state) => ({...state.dronesMap, ...state.searchNFZ});

export default asyncConnect(resolve, mapState, {...actions, loadNfz})(DronesMapView);
