import { asyncConnect } from 'redux-connect';
import { actions } from '../modules/ServiceRequest';

import ServiceRequestView from '../components/ServiceRequestView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.serviceRequest;

export default asyncConnect(resolve, mapState, actions)(ServiceRequestView);
