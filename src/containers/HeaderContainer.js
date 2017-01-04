import Header from 'components/Header';
import {asyncConnect} from 'redux-connect';
import {actions, toggleNotification, logoutAction} from '../store/modules/global';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => ({...state.global});

/*
  TODO: This is not used anymore, should be checked if this is safe to remove
  (i.e. if the toggleNotification and loginAction actions are part of
  the acetions object, injected into the asyncConnect call below).

const mapDispatchToProps = (dispatch) => ({
  handleNotification: (value) => {
    dispatch(toggleNotification(value));
  },
  handleLogin: (userObj) => dispatch(loginAction(userObj)),
});
*/

export default asyncConnect(resolve, mapState, {...actions, logoutAction})(Header);
