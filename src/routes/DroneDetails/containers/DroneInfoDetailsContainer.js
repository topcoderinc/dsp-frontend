import {connect} from 'react-redux';
import {actions} from '../modules/DroneDetails';
import DroneInfoDetails from '../components/DroneInfoDetails';

const mapState = (state) => state.droneDetails;

export default connect(mapState, actions)(DroneInfoDetails);
