import {connect} from 'react-redux';
import {actions, sendRequest} from '../modules/ServiceRequest';

import ServiceDetail from '../components/ServiceDetail';

const mapState = (state) => ({...state.serviceRequest, sendRequest});

const mapDispatch = {
  ...actions,
  cancelForm: () => (dispatch) => {
    dispatch(actions.cancelRequest());
  },
};

export default connect(mapState, mapDispatch)(ServiceDetail);
