import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/MyRequestStatus';

import MyRequestStatusView from '../components/MyRequestStatusView';

const resolve = [{
  promise: ({store}) => store.dispatch(actions.load()),
}];

const mapState = (state) => state.myRequestStatus;


export default asyncConnect(resolve, mapState, actions)(MyRequestStatusView);
