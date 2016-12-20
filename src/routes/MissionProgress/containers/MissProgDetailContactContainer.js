import { connect } from 'react-redux';
import {actions} from '../modules/MissionProgress';

import MissProgDetailContactRow from '../components/MissProgDetailContactRow';

const mapState = (state) => ({...state.missionProgress});


export default connect(mapState, actions)(MissProgDetailContactRow);
