import {connect} from 'react-redux';
import RequestMap from '../components/RequestMap';

const mapState = (state) => state.myRequest;

export default connect(mapState, {})(RequestMap);
