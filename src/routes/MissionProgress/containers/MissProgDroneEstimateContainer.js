import {connect} from 'react-redux';
import {actions} from '../modules/MissionProgress';

import MissProgDroneEstimateRow from '../components/MissProgDroneEstimateRow';

const mapState = (state) => ({...state.missionProgress});


export default connect(mapState, actions)(MissProgDroneEstimateRow);
