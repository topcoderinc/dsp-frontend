import {connect} from 'react-redux';
import MyDroneView from '../components/MyDroneView';

const mapState = (state) => state.myDrone;

export default connect(mapState, {})(MyDroneView);
