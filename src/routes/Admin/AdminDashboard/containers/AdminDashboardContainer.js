import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/AdminDashboard';

import AdminDashboardView from '../components/AdminDashboardView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.adminDashboard;

export default asyncConnect(resolve, mapState, actions)(AdminDashboardView);
