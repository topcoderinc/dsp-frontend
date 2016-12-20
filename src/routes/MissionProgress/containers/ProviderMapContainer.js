import { connect } from 'react-redux';
import ProviderMap from '../components/ProviderMap';
import { actions } from '../modules/MissionProgress';

const mapState = (state) => state.missionProgress;

export default connect(mapState, {actions})(ProviderMap);
