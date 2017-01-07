import {connect} from 'react-redux';
import {actions} from '../modules/DroneDetails';
import DroneInfoSpecification from '../components/DroneInfoSpecification';

const mapState = (state) => state.droneDetails;

export default connect(mapState, actions)(DroneInfoSpecification);
