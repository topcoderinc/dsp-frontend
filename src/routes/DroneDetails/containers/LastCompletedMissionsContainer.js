import {connect} from 'react-redux';
import {actions} from '../modules/DroneDetails';
import LastCompletedMissions from '../components/LastCompletedMissions';

const mapState = (state) => state.droneDetails;

export default connect(mapState, actions)(LastCompletedMissions);
