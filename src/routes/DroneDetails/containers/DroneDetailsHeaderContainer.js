import {connect} from 'react-redux';
import {actions} from '../modules/DroneDetails';
import DroneDetailsHeader from '../components/DroneDetailsHeader';

const mapState = (state) => state.droneDetails;

export default connect(mapState, actions)(DroneDetailsHeader);
