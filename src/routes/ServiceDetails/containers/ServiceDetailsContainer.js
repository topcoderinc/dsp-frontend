import { connect } from 'react-redux';
import ServiceDetailsView from '../components/ServiceDetailsView';

const mapState = (state) => state.serviceDetails;

export default connect(mapState, {})(ServiceDetailsView);
