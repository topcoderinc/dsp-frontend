import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/EditData';

import EditDataView from '../components/EditDataView';

const resolve = [{
  promise: ({store: {dispatch}}) => dispatch(actions.load()),
}];

const mapState = (state) => state.editData;

export default asyncConnect(resolve, mapState, actions)(EditDataView);
