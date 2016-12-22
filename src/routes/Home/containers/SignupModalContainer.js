import {connect} from 'react-redux';
import {sendSignupRequest, signupAction} from '../../../store/modules/global';

import SignupModal from '../components/SignupModal';

const mapState = (state) => ({...state.global, onSubmit: sendSignupRequest});

const mapDispatchToProps = (dispatch) => ({
  handleSigned: (value) => dispatch(signupAction(value)),
});

export default connect(mapState, mapDispatchToProps)(SignupModal);
