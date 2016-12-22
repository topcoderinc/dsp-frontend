import {connect} from 'react-redux';
import DroneDetailsView from '../components/DroneDetailsView';

const mapState = (state) => state.droneDetails;

export default connect(mapState, {})(DroneDetailsView);
