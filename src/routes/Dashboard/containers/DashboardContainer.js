import { asyncConnect } from 'redux-connect';
import { actions } from '../modules/Dashboard';

import DashboardView from '../components/DashboardView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.dashboard;

export default asyncConnect(resolve, mapState, actions)(DashboardView);
