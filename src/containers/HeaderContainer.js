import Header from 'components/Header';
import {asyncConnect} from 'redux-connect';
import {actions, toggleNotification, loginAction, logoutAction, logout} from '../store/modules/global';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => ({...state.global, doLogout: logout});

const mapDispatchToProps = (dispatch) => ({
  handleNotification: (value) => {
    dispatch(toggleNotification(value));
  },
  handleLogin: (userObj) => dispatch(loginAction(userObj)),
});

export default asyncConnect(resolve, mapState, {...actions, logoutAction})(Header);

