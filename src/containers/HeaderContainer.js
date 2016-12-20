import Header from 'components/Header';
import { asyncConnect } from 'redux-connect';
import { actions, toggleNotification, loginAction } from '../store/modules/global';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.global;

const mapDispatchToProps = (dispatch) => ({
  handleNotification: (value) => {
    dispatch(toggleNotification(value));
  },
  handleLogin: (userObj) => dispatch(loginAction(userObj)),
});

export default asyncConnect(resolve, mapState, mapDispatchToProps)(Header);

