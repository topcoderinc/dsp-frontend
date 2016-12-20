import { asyncConnect } from 'redux-connect';
import {actions} from '../modules/AvailablePackages';

import AvailablePackagesView from '../components/AvailablePackagesView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.availablePackages;

export default asyncConnect(resolve, mapState, actions)(AvailablePackagesView);
