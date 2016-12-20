import { asyncConnect } from 'redux-connect';
import {actions} from '../modules/AddServices';

import AddServicesView from '../components/AddServicesView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.addServices;

export default asyncConnect(resolve, mapState, actions)(AddServicesView);
