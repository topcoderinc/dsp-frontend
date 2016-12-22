import {connect} from 'react-redux';
import {actions} from '../modules/MissionProgress';

import MissProgRouteCameraRow from '../components/MissProgRouteCameraRow';

const mapState = (state) => ({...state.missionProgress});


export default connect(mapState, actions)(MissProgRouteCameraRow);
