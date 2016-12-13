import { asyncConnect } from 'redux-connect';
import { actions } from '../modules/StatusDetail';

import StatusProjectInfo from '../components/StatusProjectInfo';

const resolve = [{
  promise: ({ params, store }) => store.dispatch(actions.load(params.id)),
}];

const mapState = (state) => state.statusDetail.projectInfo;

export default asyncConnect(resolve, mapState, actions)(StatusProjectInfo);
