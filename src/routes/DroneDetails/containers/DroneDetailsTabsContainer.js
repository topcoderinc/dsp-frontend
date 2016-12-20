import { connect } from 'react-redux';
import DroneDetailsTabs from '../components/DroneDetailsTabs';
import { selectedDate } from '../modules/DroneDetails';

const mapState = (state) => state.droneDetails;

const mapDispatchToProps = (dispatch) => ({
  selectedDateHandle: (item) => {
    dispatch(selectedDate(item));
  },
});
export default connect(mapState, mapDispatchToProps)(DroneDetailsTabs);
