import { asyncConnect } from 'redux-connect';
import { actions } from '../modules/StatusDetail';

import OverallDronePerformance from '../components/OverallDronePerformance';

const resolve = [{
  promise: ({ params, store }) => store.dispatch(actions.load(params.id)),
}];

const mapState = (state) => state.statusDetail.overallDronePerformance;

export default asyncConnect(resolve, mapState, actions)(OverallDronePerformance);
