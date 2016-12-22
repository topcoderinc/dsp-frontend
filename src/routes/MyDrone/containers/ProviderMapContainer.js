import {connect} from 'react-redux';
import ProviderMap from '../components/ProviderMap';

const mapState = (state) => state.myDrone;

export default connect(mapState, {})(ProviderMap);
