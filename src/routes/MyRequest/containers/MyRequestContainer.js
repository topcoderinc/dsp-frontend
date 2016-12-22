import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/MyRequest';

import MyRequestView from '../components/MyRequestView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.myRequest;

export default asyncConnect(resolve, mapState, actions)(MyRequestView);
