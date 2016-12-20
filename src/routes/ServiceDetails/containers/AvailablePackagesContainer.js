import { connect } from 'react-redux';
import AvailablePackages from '../components/AvailablePackages';

const mapState = (state) => state.serviceDetails;

export default connect(mapState, {})(AvailablePackages);
