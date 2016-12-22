import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/StatusDetail';

import DroneGraphPerformance from '../components/DroneGraphPerformance';

const resolve = [{
  promise: ({params, store}) => store.dispatch(actions.load(params.id)),
}];

const mapState = (state) => ({...state.statusDetail.droneGraphPerformance, currentGraphType: state.statusDetail.currentGraphType});

export default asyncConnect(resolve, mapState, actions)(DroneGraphPerformance);
