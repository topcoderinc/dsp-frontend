import {connect} from 'react-redux';
import {markAsComplete} from '../modules/MissionProgress';

import MissionProgressHeader from '../components/MissionProgressHeader';

const mapState = (state) => ({...state.missionProgress});

const mapDispatchToProps = (dispatch) => ({
  handleStatus: (text) => {
    dispatch(markAsComplete(text));
  },
});

export default connect(mapState, mapDispatchToProps)(MissionProgressHeader);
