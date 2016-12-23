import NfzMap from '../components/NfzMap';
import {connect} from 'react-redux';
import {actions} from '../modules/NoFlyZones';

const mapState = (state) => state.noFlyZones;

export default connect(mapState, actions)(NfzMap);

