import {connect} from 'react-redux';
import MyRequestItems from '../components/MyRequestItems';

const mapState = (state) => state.myRequest;

export default connect(mapState, {})(MyRequestItems);
