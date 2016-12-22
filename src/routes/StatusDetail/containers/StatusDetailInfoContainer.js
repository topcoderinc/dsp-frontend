import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/StatusDetail';

import StatusDetailInfo from '../components/StatusDetailInfo';

const resolve = [{
  promise: ({params, store}) => store.dispatch(actions.load(params.id)),
}];

const mapState = (state) => state.statusDetail;

export default asyncConnect(resolve, mapState, actions)(StatusDetailInfo);
