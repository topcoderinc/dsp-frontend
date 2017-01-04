import {connect} from 'react-redux';
import {loginAction} from '../../../store/modules/global';
import LogInModal from '../components/LoginModal';

const mapState = (state) => ({...state.global});

export default connect(mapState, {
  loginAction,
})(LogInModal);
