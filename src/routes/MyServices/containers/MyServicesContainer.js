import { connect } from 'react-redux';
import MyServicesView from '../components/MyServicesView';

const mapState = (state) => state.myServices;

export default connect(mapState, {})(MyServicesView);
