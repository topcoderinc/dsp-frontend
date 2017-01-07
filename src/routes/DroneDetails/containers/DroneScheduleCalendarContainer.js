import {connect} from 'react-redux';
import {actions} from '../modules/DroneDetails';
import DroneScheduleCalendar from '../components/DroneScheduleCalendar';

const mapState = (state) => state.droneDetails;

export default connect(mapState, actions)(DroneScheduleCalendar);
