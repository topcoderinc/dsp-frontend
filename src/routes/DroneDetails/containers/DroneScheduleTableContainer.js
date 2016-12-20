import { connect } from 'react-redux';
import DroneScheduleTable from '../components/DroneScheduleTable';

const mapState = (state) => state.droneDetails;

export default connect(mapState, {})(DroneScheduleTable);
