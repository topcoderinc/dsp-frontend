import {asyncConnect} from 'redux-connect';
import {actions, loadRequests, loadTotals, assignDrone, rejectRequest, getDrones} from '../modules/MyRequest';

import MyRequestView from '../components/MyRequestView';

const resolve = [{
  promise: ({store}) => loadTotals(store.dispatch),
}];

const mapState = (state) => state.myRequest;

const mapDispatch = (dispatch) => ({
  ...actions,
  assignDrone,
  rejectRequest,
  getDrones,
  loadRequests: (status, limit, offset) => loadRequests(dispatch, status, limit, offset),
  loadTotals: () => loadTotals(dispatch),
});

export default asyncConnect(resolve, mapState, mapDispatch)(MyRequestView);
