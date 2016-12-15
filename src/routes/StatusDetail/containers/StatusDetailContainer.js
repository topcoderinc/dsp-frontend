import { asyncConnect } from 'redux-connect';
import { actions } from '../modules/StatusDetail';

import StatusDetailView from '../components/StatusDetailView';

const resolve = [{
  promise: ({ params, store }) => store.dispatch(actions.load(params.id)),
}];

const mapState = (state) => state.statusDetail;

export default asyncConnect(resolve, mapState, actions)(StatusDetailView);
