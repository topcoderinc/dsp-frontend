import {connect} from 'react-redux';
import {sendRequest, uploadPicture} from '../modules/EditData';

import TelemetryTabs from '../components/TelemetryTabs';

const mapState = (state) => ({...state.editData, onSubmit: sendRequest});

const mapDispatchToProps = (dispatch) => ({
  uploadPicture: (item) => {
    dispatch(uploadPicture(item));
  },
});
export default connect(mapState, mapDispatchToProps)(TelemetryTabs);
