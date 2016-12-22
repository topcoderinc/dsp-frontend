import { asyncConnect } from 'redux-connect';
import {actions} from '../modules/ProviderDetails';

import ProviderDetailsView from '../components/ProviderDetailsView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.providerDetails;

export default asyncConnect(resolve, mapState, actions)(ProviderDetailsView);
