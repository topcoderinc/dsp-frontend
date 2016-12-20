import { connect } from 'react-redux';
import {actions, sendLoginRequest, loginAction} from '../../../store/modules/global';

import LogInSignUpModal from '../components/LogInSignUpModal';

const mapState = (state) => ({...state.global, onSubmit: sendLoginRequest});

const mapDispatchToProps = (dispatch) => ({
  handleLoggedIn: (value) => dispatch(loginAction(value)),
});

export default connect(mapState, mapDispatchToProps)(LogInSignUpModal);
