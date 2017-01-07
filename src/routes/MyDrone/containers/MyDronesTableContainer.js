import {connect} from 'react-redux';
import {actions} from '../modules/MyDrone';
import MyDronesTable from '../components/MyDronesTable';

const mapState = (state) => state.myDrone;

export default connect(mapState, actions)(MyDronesTable);
