import { connect } from 'react-redux';
import MissionGallery from '../components/MissionGallery';

const mapState = (state) => state.missionProgress;

export default connect(mapState, {})(MissionGallery);
