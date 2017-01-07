import {connect} from 'react-redux';
import {actions} from '../modules/MyDrone';
import MyDronesTabs from '../components/MyDronesTabs';

const mapState = (state) => state.myDrone;

export default connect(mapState, actions)(MyDronesTabs);
