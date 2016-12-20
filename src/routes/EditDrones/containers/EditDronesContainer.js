import { asyncConnect } from 'redux-connect';
import {actions} from '../modules/EditDrones';

import EditDronesView from '../components/EditDronesView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.editDrones;

export default asyncConnect(resolve, mapState, actions)(EditDronesView);
