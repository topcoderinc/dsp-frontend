import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/StatusDetail';

import StatusDetailMapRoute from '../components/StatusDetailMapRoute';

const resolve = [{
  promise: ({params, store}) => store.dispatch(actions.load(params.id)),
}];

const mapState = (state, ownProps) => ({...state.statusDetail, ...ownProps});

export default asyncConnect(resolve, mapState, actions)(StatusDetailMapRoute);
