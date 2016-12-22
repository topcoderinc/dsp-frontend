import {connect} from 'react-redux';
import {sendRequest, addPackagesAction} from '../modules/AddServices';

import AddServicesForm from '../components/AddServicesForm';

const mapState = (state) => ({...state.addServices, onSubmit: sendRequest});

const mapDispatchToProps = (dispatch) => ({
  addPackageHandle: (payload) => {
    dispatch(addPackagesAction(payload));
  },
});

export default connect(mapState, mapDispatchToProps)(AddServicesForm);
