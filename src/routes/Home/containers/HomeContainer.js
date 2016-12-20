import { asyncConnect } from 'redux-connect';
import {actions} from '../modules/Home';

import HomeView from '../components/HomeView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.home;

export default asyncConnect(resolve, mapState, actions)(HomeView);
