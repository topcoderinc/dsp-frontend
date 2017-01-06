import {asyncConnect} from 'redux-connect';
import {actions, loadPackage} from '../modules/ServiceRequest';

import ServiceRequestView from '../components/ServiceRequestView';

const resolve = [{
  promise: ({params, store}) => loadPackage(params.id, store.dispatch),
}];

const mapState = (state) => state.serviceRequest;

export default asyncConnect(resolve, mapState, actions)(ServiceRequestView);
