import {connect} from 'react-redux';
import ProviderMap from '../components/ProviderMap';
import {actions} from '../modules/ServiceRequest';

const mapState = (state) => state.serviceRequest;

export default connect(mapState, actions)(ProviderMap);
