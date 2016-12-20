import { connect } from 'react-redux';
import {actions, sendRequest} from '../modules/ServiceRequest';

import ServiceDetail from '../components/ServiceDetail';

const mapState = (state) => ({...state.serviceRequest, onSubmit: sendRequest});

export default connect(mapState, actions)(ServiceDetail);
